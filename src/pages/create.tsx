import { useEffect, useState, type FormEvent } from "react";
import Header from "../components/header";
import { saveFlashcard } from "../utils/file";
import type { FlashcardType } from "../utils/types";

// TODO: refactor to /questions/create
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
  };

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-between">
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
          <br />
          <button type="submit" className="btn">
            Create
          </button>
        </form>
        {showSuccess && <p className="mt-4 text-sm font-semibold">Question Created!</p>}
      </main>
    </div>
  );
}
