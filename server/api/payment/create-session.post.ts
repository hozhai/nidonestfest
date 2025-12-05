import { getRequestURL } from 'h3';
import { auth } from '../../utils/auth';
import { getPrizeOptionsByKeys } from '../../../lib/prizes';
import { createWebpayCheckout } from '../../utils/payments';
import { Pool } from 'pg';
import Database from 'better-sqlite3';
import { getDatabase } from '../../db';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const body = await readBody<{ prizeCategories?: string[] }>(event);
  const rawPrizeKeys = Array.isArray(body.prizeCategories) ? body.prizeCategories : [];
  const normalizedPrizeKeys = Array.from(
    new Set(
      rawPrizeKeys
        .filter((key): key is string => typeof key === 'string')
        .map((key) => key.trim())
        .filter((key) => key.length > 0)
    )
  );

  if (normalizedPrizeKeys.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Please select at least one award.' });
  }

  const db = getDatabase();

  const sortPrizeKeys = (keys: string[]) => [...new Set(keys)].sort();

  const parseStoredPrizeKeys = (row?: { prize_category?: string | null; prize_categories?: string | null } | null): string[] => {
    if (!row) return [];
    const { prize_category, prize_categories } = row;
    if (prize_categories) {
      try {
        const parsed = JSON.parse(prize_categories) as string[];
        return Array.isArray(parsed) ? sortPrizeKeys(parsed) : [];
      } catch (err) {
        console.error('Failed to parse stored prize categories', err);
      }
    }
    if (prize_category) {
      return sortPrizeKeys([prize_category]);
    }
    return [];
  };

  const existingPrizeKeys: string[] = await (async () => {
    if (db instanceof Pool) {
      const result = await (db as Pool).query<{ prize_category: string | null; prize_categories: string | null }>(
        'SELECT prize_category, prize_categories FROM submissions WHERE user_id = $1 LIMIT 1',
        [session.user.id]
      );
      const row = result?.rows?.[0];
      return parseStoredPrizeKeys(row || null);
    }
    if (db instanceof Database) {
      const stmt = (db as any).prepare(
        'SELECT prize_category, prize_categories FROM submissions WHERE user_id = ? LIMIT 1'
      );
      const row = stmt.get(session.user.id) as { prize_category: string | null; prize_categories: string | null } | undefined;
      return parseStoredPrizeKeys(row || null);
    }
    return [];
  })();

  const missingLocked = existingPrizeKeys.filter((key) => !normalizedPrizeKeys.includes(key));
  if (missingLocked.length > 0) {
    throw createError({ statusCode: 400, statusMessage: 'Previously paid awards cannot be removed.' });
  }

  const addedPrizeKeys = normalizedPrizeKeys.filter((key) => !existingPrizeKeys.includes(key));
  if (addedPrizeKeys.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No additional awards selected to pay for.' });
  }

  const addedPrizeOptions = getPrizeOptionsByKeys(addedPrizeKeys);
  if (!addedPrizeOptions) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid prize selection' });
  }

  const totalAmount = addedPrizeOptions.reduce((sum, prize) => sum + prize.entryFee, 0);
  const { origin } = getRequestURL(event);

  try {
    const checkout = await createWebpayCheckout({
      userId: session.user.id,
      prizeKeys: normalizedPrizeKeys,
      amount: totalAmount,
      returnUrl: `${origin}/submission`,
    });
    return { method: 'webpay', url: checkout.url, token: checkout.token };
  } catch (err) {
    console.error('Payment init error', err);
    throw createError({ statusCode: 500, statusMessage: 'Failed to initiate payment session' });
  }
});
