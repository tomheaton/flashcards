import { message } from "@tauri-apps/api/dialog";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { FlashcardType } from "../types";
import { saveFlashcard } from "../utils/file";

export default function Create() {
  const [data, setData] = useState<FlashcardType>({
    question: "",
    answer: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveFlashcard(data);
    // navigate to questions page?
    setData({ question: "", answer: "" });
    await message("Flashcard Created!", { title: "Flashcard", type: "info" });
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">Create</h1>
      <div className="space-x-4">
        <Link to={`/`}>
          <button>Home</button>
        </Link>
        <Link to={`/questions`}>
          <button>Questions</button>
        </Link>
        <Link to={`/test`}>
          <button>Test</button>
        </Link>
      </div>
      <br />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label htmlFor="question" className="text-sm">
          Question
        </label>
        <input
          className="rounded-md border-2 border-gray-300 bg-black px-4 py-2 text-white"
          type="text"
          placeholder="What is TypeScript?"
          required
          value={data.question}
          onChange={(e) => setData({ ...data, question: e.target.value })}
        />
        <label htmlFor="answer" className="text-sm">
          Answer
        </label>
        <textarea
          className="rounded-md border-2 border-gray-300 bg-black px-4 py-2 text-white"
          placeholder="The best language!"
          required
          value={data.answer}
          onChange={(e) => setData({ ...data, answer: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
