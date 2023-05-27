import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Flashcard from "../components/flashcard";
import Header from "../components/header";
import type { FlashcardType } from "../utils/types";

const DECKS = ["default", "test"];

export default function Cards() {
  const data = useLoaderData() as FlashcardType[];

  const [decks, setDecks] = useState<string[]>(DECKS);

  const filteredData = useMemo(() => {
    if (decks.length === 0) return [];
    return data.filter((flashcard) => decks.includes(flashcard.deck ?? "default"));
  }, [data, decks]);

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center space-y-2 pb-4">
        <div className="flex w-[300px] items-center space-x-2">
          <p className="text-sm font-semibold">Decks:</p>
          {DECKS.map((deck) => (
            <button
              key={deck}
              className={`btn ${decks.includes(deck) ? "bg-white/20 text-white" : ""}`}
              onClick={() =>
                setDecks((prev) =>
                  prev.includes(deck) ? prev.filter((d) => d !== deck) : [...prev, deck],
                )
              }
            >
              {deck}
            </button>
          ))}
        </div>
        {filteredData.length === 0 ? (
          <p className="text-sm font-semibold">No flashcards found!</p>
        ) : (
          <p className="w-[300px] text-sm font-semibold">Total: {data.length.toLocaleString()}</p>
        )}
        {filteredData.map((flashcard, index) => (
          <Flashcard tabIndex={index} key={flashcard.id} flashcard={flashcard} />
        ))}
      </main>
    </div>
  );
}
