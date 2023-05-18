import { useEffect, useState, type FormEvent } from "react";
import Nav from "../components/nav";
import type { FlashcardType } from "../types";
import { saveFlashcard } from "../utils/file";

export default function Create() {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [data, setData] = useState<FlashcardType>({
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (!showSuccess) return;

    const timeout = setTimeout(() => {
      setShowSuccess(false);
    }, 2_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showSuccess]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveFlashcard(data);
    setData({ question: "", answer: "" });
    setShowSuccess(true);
    // await message("Flashcard Created!", { title: "Flashcard", type: "info" });
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">Create</h1>
      <Nav />
      <form onSubmit={handleSubmit} className="flex w-[300px] flex-col space-y-2 text-sm">
        <label htmlFor="question" className="text-sm font-semibold">
          Question
        </label>
        <input
          id="question"
          name="question"
          className="rounded-md border-2 border-white/50 bg-black px-4 py-2 text-white"
          type="text"
          placeholder="What is TypeScript?"
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
          placeholder="The best language!"
          required
          value={data.answer}
          onChange={(e) => setData({ ...data, answer: e.target.value })}
          autoComplete="off"
        />
        <button type="submit" className="btn">
          Create
        </button>
      </form>
      {showSuccess && <p className="mt-4 text-sm font-semibold">Question Created!</p>}
    </div>
  );
}
