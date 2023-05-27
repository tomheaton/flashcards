import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Flashcard from "../components/flashcard";
import Header from "../components/header";
import { DECKS } from "../utils/constants";
import type { FlashcardType } from "../utils/types";

export default function Cards() {
  const data = useLoaderData() as FlashcardType[];

  const [decks, setDecks] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (decks.length === 0) return data;
    return data.filter((flashcard) => decks.includes(flashcard.deck ?? "default"));
  }, [data, decks]);

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center space-y-2 pb-4">
        {data.length === 0 ? (
          <p className="text-sm font-semibold">No flashcards found!</p>
        ) : (
          <>
            <p className="w-[300px] text-sm font-semibold">
              Total: {filteredData.length.toLocaleString()}
            </p>
            <div className="flex w-[300px] items-center space-x-2">
              <p className="text-sm font-semibold">Decks:</p>
              {DECKS.map((deck) => (
                <button
                  key={deck.key}
                  className={`btn ${decks.includes(deck.key) ? "bg-white/20 text-white" : ""}`}
                  onClick={() =>
                    setDecks((prev) =>
                      prev.includes(deck.key)
                        ? prev.filter((d) => d !== deck.key)
                        : [...prev, deck.key],
                    )
                  }
                >
                  {deck.label}
                </button>
              ))}
            </div>
          </>
        )}
        {filteredData.length === 0 && (
          <p className="text-sm font-semibold">No flashcards in this deck!</p>
        )}
        {filteredData.map((flashcard, index) => (
          <Flashcard tabIndex={index} key={flashcard.id} flashcard={flashcard} />
        ))}
      </main>
    </div>
  );
}
