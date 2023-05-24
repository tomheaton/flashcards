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
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm font-semibold">{flashcard.question}</p>
            <p className="text-sm">{flashcard.answer}</p>
          </div>
          {/* TODO: this */}
          {/* @ts-ignore */}
          {/* <p
            className={`btn ${
              difficultyLevels.find(({ key }) => key === flashcard.currentDifficulty)?.textStyle
            }`}
          >
            {flashcard.currentDifficulty}
          </p> */}
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
