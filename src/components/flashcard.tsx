import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRevalidator } from "react-router-dom";
import { deleteFlashcard, updateFlashcard } from "../utils/file";
import type { FlashcardType } from "../utils/types";

export default function Flashcard({
  flashcard,
  tabIndex,
}: {
  flashcard: FlashcardType;
  tabIndex: number;
}) {
  let revalidator = useRevalidator();

  const flashcardRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [data, setData] = useState<Omit<FlashcardType, "id">>(flashcard);

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
    await updateFlashcard(flashcard.id, data);
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
      <div
        className="group flex w-[300px] items-center justify-between space-y-2 rounded-lg border-2 border-white/50 p-2"
        tabIndex={tabIndex}
      >
        <div className="mr-4 overflow-hidden">
          <p className="text-ellipsis text-sm font-semibold">{flashcard.question}</p>
          <p className="text-ellipsis text-xs">{flashcard.answer}</p>
          <p className="text-ellipsis text-xs">Deck: {flashcard.deck ?? "default"}</p>
        </div>
        <button
          // className="btn hidden group-hover:block"
          className="btn opacity-0 group-hover:opacity-100"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div
      ref={flashcardRef}
      className="flex w-[300px] flex-col space-y-2 rounded-lg border-2 border-white/50 p-2"
      tabIndex={tabIndex}
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
        <label htmlFor="deck" className="text-sm font-semibold">
          Deck
        </label>
        <select
          id="deck"
          name="deck"
          className="rounded-md border-2 border-white/50 bg-black px-4 py-2 text-white"
          required
          value={data.deck ?? "default"}
          onChange={(e) => setData({ ...data, deck: e.target.value })}
        >
          {/* TODO: get this from data */}
          <option value="default" defaultChecked>
            Default
          </option>
          <option value="test">Test</option>
        </select>
        <br />
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
