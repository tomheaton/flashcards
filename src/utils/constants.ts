import type { DifficultyType } from "./types";

export const difficultyLevels: { key: DifficultyType; label: string; textStyle: string }[] = [
  { key: "easy", label: "Easy", textStyle: "text-emerald-500" },
  { key: "medium", label: "Medium", textStyle: "text-yellow-500" },
  { key: "hard", label: "Hard", textStyle: "text-red-500" },
];
