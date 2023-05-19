import { z } from "zod";

export const FlashcardSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export type FlashcardType = z.infer<typeof FlashcardSchema>;

export const StatsSchema = z.object({
  total: z.number(),
  correct: z.number(),
  incorrect: z.number(),
});

export type StatsType = z.infer<typeof StatsSchema>;
