import { useLoaderData } from "react-router-dom";
import Flashcard from "../components/flashcard";
import Nav from "../components/nav";
import { FlashcardType } from "../types";

export default function Questions() {
  const data = useLoaderData() as FlashcardType[];

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">Questions</h1>
      <Nav />
      <div className="flex flex-col space-y-2">
        {data.map((flashcard, index) => (
          <Flashcard key={flashcard.question} initialData={flashcard} index={index} />
        ))}
        {data.length === 0 && <p className="text-sm">No flashcards found</p>}
      </div>
    </div>
  );
}
