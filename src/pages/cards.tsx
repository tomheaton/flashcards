import { useLoaderData } from "react-router-dom";
import Flashcard from "../components/flashcard";
import Header from "../components/header";
import type { FlashcardType } from "../utils/types";

export default function Cards() {
  const data = useLoaderData() as FlashcardType[];

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center space-y-2">
        {data.length === 0 && <p className="text-sm font-semibold">No flashcards found!</p>}
        {data.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </main>
    </div>
  );
}
