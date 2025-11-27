export type PrizeOption = {
  key: string;
  entryFee: number;
};

export const PRIZE_OPTIONS: PrizeOption[] = [
  { key: "best_narrative", entryFee: 20000 },
  { key: "best_cinematography", entryFee: 15000 },
  { key: "best_editing", entryFee: 15000 },
  { key: "best_screenwriting", entryFee: 15000 },
  { key: "best_sound", entryFee: 15000 },
  { key: "best_acting", entryFee: 15000 },
  { key: "best_documentary", entryFee: 20000 },
  { key: "best_use_music", entryFee: 15000 },
];

export const getPrizeOption = (key?: string | null) =>
  PRIZE_OPTIONS.find((option) => option.key === key) || null;

export const getPrizeOptionsByKeys = (keys: string[]) => {
  const uniqueKeys = Array.from(
    new Set(keys.filter((key) => typeof key === "string" && key.trim().length > 0).map((key) => key.trim()))
  );

  const options: PrizeOption[] = [];
  for (const key of uniqueKeys) {
    const option = getPrizeOption(key);
    if (!option) {
      return null;
    }
    options.push(option);
  }

  return options;
};

export const calculatePrizeTotal = (keys: string[]) => {
  const options = getPrizeOptionsByKeys(keys);
  if (!options) return null;
  return options.reduce((sum, prize) => sum + prize.entryFee, 0);
};
