import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../components/header";
import type { FlashcardType } from "../utils/types";

export default function Practice() {
  const data = useLoaderData() as FlashcardType[];

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    // TODO: handle if show button is already selected active
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCounter((p) => (p > 0 ? p - 1 : data.length - 1));
      } else if (e.key === "ArrowRight") {
        setCounter((p) => (p < data.length - 1 ? p + 1 : 0));
      } else if (e.key === " ") {
        setShowAnswer((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // move to button click logic
  useEffect(() => {
    setShowAnswer(false);
  }, [counter]);

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold">{data[counter]?.question}</p>
          {showAnswer && <p>{data[counter]?.answer}</p>}
          <br />
          {/* <button onClick={() => setShowAnswer((p) => !p)} className="btn">
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button> */}
        </div>

        <div className="flex flex-col space-y-4">
          <button onClick={() => setShowAnswer((p) => !p)} className="btn">
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <div className="flex items-center justify-evenly space-x-4">
            <button
              onClick={() => setCounter((p) => (p > 0 ? p - 1 : data.length - 1))}
              className="btn"
            >
              Previous
            </button>
            <p className="text-sm font-semibold">
              {counter + 1} / {data.length}
            </p>
            <button
              onClick={() => setCounter((p) => (p < data.length - 1 ? p + 1 : 0))}
              className="btn"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
