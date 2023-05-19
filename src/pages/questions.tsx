import { useLoaderData } from "react-router-dom";
import Flashcard from "../components/flashcard";
import Header from "../components/header";
import type { FlashcardType } from "../utils/types";

export default function Questions() {
  // TODO: move function to this file and get type from return type
  const data = useLoaderData() as FlashcardType[];

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center space-y-2">
        {data.length === 0 && <p className="text-sm font-semibold">No flashcards found!</p>}
        {data.map((flashcard, index) => (
          <Flashcard key={flashcard.question} initialData={flashcard} index={index} />
        ))}
      </main>
    </div>
  );
}
