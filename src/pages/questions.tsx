import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Flashcard from "../components/flashcard";
import type { FlashcardType } from "../types";
import { readData } from "../utils/file";

export default function Questions() {
  const [data, setData] = useState<FlashcardType[]>([]);

  // TODO: move logic to router data generator
  useEffect(() => {
    (async () => {
      const data = await readData();
      if (data) {
        console.log("Data file found");
        // TODO: use zod to validate data
        setData(JSON.parse(data) as FlashcardType[]);
      }
    })();
  }, []);

  return (
    <div className="mt-20 flex h-screen w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">Questions</h1>
      <div className="space-x-4">
        <Link to={`/create`}>
          <button>Create</button>
        </Link>
        <Link to={`/`}>
          <button>Home</button>
        </Link>
        <Link to={`/test`}>
          <button>Test</button>
        </Link>
      </div>
      <br />
      <div className="flex flex-col space-y-2">
        {data.map((flashcard) => (
          <Flashcard key={flashcard.question} data={flashcard} />
        ))}
        {data.length === 0 && <p className="text-sm">No flashcards found</p>}
      </div>
    </div>
  );
}
