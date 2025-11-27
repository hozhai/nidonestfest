import { getRequestURL } from 'h3';
import { auth } from '../../utils/auth';
import { getPrizeOptionsByKeys } from '../../../lib/prizes';
import { createWebpayCheckout } from '../../utils/payments';

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

  const prizeOptions = getPrizeOptionsByKeys(normalizedPrizeKeys);
  if (!prizeOptions) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid prize selection' });
  }

  const totalAmount = prizeOptions.reduce((sum, prize) => sum + prize.entryFee, 0);
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
