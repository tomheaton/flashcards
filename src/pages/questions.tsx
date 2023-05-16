import { Link, useActionData, useLoaderData } from "react-router-dom";
import Flashcard from "../components/flashcard";
import { FlashcardType } from "../types";

export default function Questions() {
  const data = useLoaderData() as FlashcardType[];

  return (
    <div className="mt-20 flex w-full flex-col items-center">
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
        {data.map((flashcard, index) => (
          <Flashcard key={flashcard.question} initialData={flashcard} index={index} />
        ))}
        {data.length === 0 && <p className="text-sm">No flashcards found</p>}
      </div>
    </div>
  );
}
