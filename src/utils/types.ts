import { z } from "zod";

export const Difficulty = ["easy", "medium", "hard"] as const;
export type DifficultyType = (typeof Difficulty)[number];

export const FlashcardSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  currentDifficulty: z.enum(Difficulty),
  // lastSeen: z.date().nullable(),
  // nextDue: z.date().nullable(),
});

export type FlashcardType = z.infer<typeof FlashcardSchema>;

export const StatsSchema = z.object({
  total: z.number(),
  correct: z.number(),
  incorrect: z.number(),
  easy: z.number(),
  medium: z.number(),
  hard: z.number(),
});

export type StatsType = z.infer<typeof StatsSchema>;
