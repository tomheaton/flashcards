import type { FlashcardType } from "../types";

export default function Flashcard({ data }: { data: FlashcardType }) {
  return (
    <div className="flex w-[400px] flex-col space-y-2 rounded-lg border-2 border-gray-500 p-2">
      <div className="text-sm font-bold">{data.question}</div>
      <div className="text-sm">{data.answer}</div>
    </div>
  );
}
