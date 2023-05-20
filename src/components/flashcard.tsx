import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRevalidator } from "react-router-dom";
import { deleteFlashcard, updateFlashcard } from "../utils/file";
import type { FlashcardType } from "../utils/types";

export default function Flashcard({ flashcard }: { flashcard: FlashcardType }) {
  let revalidator = useRevalidator();

  const flashcardRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  // TODO: only use question/answer from flashcard here?
  const [data, setData] = useState<FlashcardType>(flashcard);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flashcardRef.current && !flashcardRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateFlashcard(data);
    setIsEditing(false);
    revalidator.revalidate();
  };

  const handleDelete = async () => {
    await deleteFlashcard(flashcard.id);
    setIsEditing(false);
    revalidator.revalidate();
  };

  if (!isEditing) {
    return (
      <div className="group flex w-[300px] justify-between space-y-2 rounded-lg border-2 border-white/50 p-2">
        <div>
          <p className="text-sm font-semibold">{flashcard.question}</p>
          <p className="text-sm">{flashcard.answer}</p>
        </div>
        <button className="btn hidden group-hover:block" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
    );
  }

  return (
    <div
      ref={flashcardRef}
      className="flex w-[300px] flex-col space-y-2 rounded-lg border-2 border-white/50 p-2"
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 text-sm">
        <label htmlFor="question" className="text-sm font-semibold">
          Question
        </label>
        <input
          id="question"
          name="question"
          className="rounded-md border-2 border-white/50 bg-black px-4 py-2 text-white"
          type="text"
          placeholder={flashcard.question}
          required
          value={data.question}
          onChange={(e) => setData({ ...data, question: e.target.value })}
          autoComplete="off"
        />
        <label htmlFor="answer" className="text-sm font-semibold">
          Answer
        </label>
        <textarea
          id="answer"
          name="answer"
          className="rounded-md border-2 border-white/50 bg-black px-4 py-2 text-white"
          placeholder={flashcard.answer}
          required
          value={data.answer}
          onChange={(e) => setData({ ...data, answer: e.target.value })}
          autoComplete="off"
        />
        <button type="submit" className="btn">
          Save
        </button>
      </form>
      <button onClick={handleDelete} className="btn-red">
        Delete
      </button>
    </div>
  );
}
