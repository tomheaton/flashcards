import type { DifficultyType } from "./types";

export const DIFFICULTY_LEVELS: { key: DifficultyType; label: string; textStyle: string }[] = [
  { key: "easy", label: "Easy", textStyle: "text-emerald-500" },
  { key: "medium", label: "Medium", textStyle: "text-yellow-500" },
  { key: "hard", label: "Hard", textStyle: "text-red-500" },
];

export const DECKS: { key: string; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "test", label: "Test" },
];
