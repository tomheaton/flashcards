import { useLoaderData } from "react-router-dom";
import Flashcard from "../components/flashcard";
import Header from "../components/header";
import type { FlashcardType } from "../utils/types";

export default function Cards() {
  const data = useLoaderData() as FlashcardType[];

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center space-y-2 pb-4">
        {data.length === 0 ? (
          <p className="text-sm font-semibold">No flashcards found!</p>
        ) : (
          <p className="w-[300px] text-sm font-semibold">Total: {data.length.toLocaleString()}</p>
        )}
        {data.map((flashcard, index) => (
          <Flashcard tabIndex={index} key={flashcard.id} flashcard={flashcard} />
        ))}
      </main>
    </div>
  );
}
