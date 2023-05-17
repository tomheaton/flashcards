import { useState, type FormEvent } from "react";
import { useRevalidator } from "react-router-dom";
import type { FlashcardType } from "../types";
import { updateFlashcard } from "../utils/file";

export default function Flashcard({
  initialData,
  index,
}: {
  initialData: FlashcardType;
  // TODO: use ID instead of index, need to add ID to data type
  index: number;
}) {
  let revalidator = useRevalidator();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [data, setData] = useState<FlashcardType>(initialData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateFlashcard(data, index);
    setIsEditing(false);
    revalidator.revalidate();
  };

  if (isEditing) {
    return (
      <div className="flex w-[400px] flex-col space-y-2 rounded-lg border-2 border-gray-500 p-2">
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <label htmlFor="question" className="text-sm">
            Question
          </label>
          <input
            id="question"
            name="question"
            className="rounded-md border-2 border-gray-300 bg-black px-4 py-2 text-white"
            type="text"
            placeholder={initialData.question}
            required
            value={data.question}
            onChange={(e) => setData({ ...data, question: e.target.value })}
          />
          <label htmlFor="answer" className="text-sm">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            className="rounded-md border-2 border-gray-300 bg-black px-4 py-2 text-white"
            placeholder={initialData.answer}
            required
            value={data.answer}
            onChange={(e) => setData({ ...data, answer: e.target.value })}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className="group flex w-[400px] justify-between space-y-2 rounded-lg border-2 border-gray-500 p-2">
      <div>
        <div className="text-sm font-bold">{initialData.question}</div>
        <div className="text-sm">{initialData.answer}</div>
      </div>
      <button className="hidden group-hover:flex" onClick={() => setIsEditing(true)}>
        edit
      </button>
    </div>
  );
}
