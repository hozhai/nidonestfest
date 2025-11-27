export type PrizeOption = {
  key: string;
  name: string;
  entryFee: number;
};

export const PRIZE_OPTIONS: PrizeOption[] = [
  { key: "best_narrative", name: "Best Narrative Picture", entryFee: 20000 },
  { key: "best_cinematography", name: "Best Cinematography in a Narrative Picture", entryFee: 15000 },
  { key: "best_editing", name: "Best Editing in a Narrative Picture", entryFee: 15000 },
  { key: "best_screenwriting", name: "Best Screenwriting in a Narrative Picture", entryFee: 15000 },
  { key: "best_sound", name: "Best Sound Design in a Narrative Picture", entryFee: 15000 },
  { key: "best_acting", name: "Best Acting in a Narrative Picture", entryFee: 15000 },
  { key: "best_documentary", name: "Best Documentary Picture", entryFee: 20000 },
  { key: "best_use_music", name: "Best Use of Music", entryFee: 15000 },
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
