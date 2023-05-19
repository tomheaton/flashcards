import { z } from "zod";

export const FlashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export type Flashcard = z.infer<typeof FlashcardSchema>;
