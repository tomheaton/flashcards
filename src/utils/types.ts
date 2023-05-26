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
  deck: z.string().optional(),
});

export type FlashcardType = z.infer<typeof FlashcardSchema>;

// TODO: add deck schema
// export const DeckSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   description: z.string(),
//   cards: z.array(FlashcardSchema),
// });

// export type DeckType = z.infer<typeof DeckSchema>;

export const StatsSchema = z.object({
  total: z.number(),
  correct: z.number(),
  incorrect: z.number(),
  easy: z.number(),
  medium: z.number(),
  hard: z.number(),
});

export type StatsType = z.infer<typeof StatsSchema>;
