export type PrizeOption = {
  key: string;
};

export const PRIZE_OPTIONS: PrizeOption[] = [
  { key: "best_narrative" },
  { key: "best_cinematography" },
  { key: "best_editing" },
  { key: "best_screenwriting" },
  { key: "best_sound" },
  { key: "best_acting" },
  { key: "best_documentary" },
  { key: "best_use_music" },
];

export const getPrizeOption = (key?: string | null) =>
  PRIZE_OPTIONS.find((option) => option.key === key) || null;

export const getPrizeOptionsByKeys = (keys: string[]) => {
  const uniqueKeys = Array.from(
    new Set(
      keys
        .filter((key) => typeof key === "string" && key.trim().length > 0)
        .map((key) => key.trim()),
    ),
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
