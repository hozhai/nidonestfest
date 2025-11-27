import { describe, expect, it } from 'vitest';
import { PRIZE_OPTIONS, getPrizeOption, getPrizeOptionsByKeys, calculatePrizeTotal } from '~/lib/prizes';

describe('Prize helpers', () => {
  it('finds a single prize option by key', () => {
    const firstPrize = PRIZE_OPTIONS[0];
    expect(getPrizeOption(firstPrize.key)).toEqual(firstPrize);
    expect(getPrizeOption('unknown-prize')).toBeNull();
  });

  it('returns null if any requested key is invalid', () => {
    const result = getPrizeOptionsByKeys([PRIZE_OPTIONS[0].key, 'invalid']);
    expect(result).toBeNull();
  });

  it('deduplicates and preserves only valid keys', () => {
    const keys = [PRIZE_OPTIONS[0].key, PRIZE_OPTIONS[0].key, PRIZE_OPTIONS[1].key];
    const result = getPrizeOptionsByKeys(keys);
    expect(result?.map((p) => p.key)).toEqual([PRIZE_OPTIONS[0].key, PRIZE_OPTIONS[1].key]);
  });

  it('calculates the total entry fee for multiple prizes', () => {
    const keys = [PRIZE_OPTIONS[0].key, PRIZE_OPTIONS[1].key];
    const expectedTotal = PRIZE_OPTIONS[0].entryFee + PRIZE_OPTIONS[1].entryFee;
    expect(calculatePrizeTotal(keys)).toBe(expectedTotal);
  });

  it('returns null total when any prize key is invalid', () => {
    expect(calculatePrizeTotal(['invalid'])).toBeNull();
  });
});
