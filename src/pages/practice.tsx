import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Nav from "../components/nav";
import { FlashcardType } from "../types";

export default function Practice() {
  const data = useLoaderData() as FlashcardType[];

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
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
    <div className="mt-20 flex w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">Practice</h1>
      <Nav />
      <p className="text-xl font-semibold">{data[counter]?.question}</p>
      {showAnswer && <p>{data[counter]?.answer}</p>}
      <br />
      <button onClick={() => setShowAnswer((p) => !p)} className="btn">
        Toggle Answer
      </button>
      <br />
      <div className="flex space-x-4">
        <button
          onClick={() => setCounter((p) => (p > 0 ? p - 1 : data.length - 1))}
          className="btn"
        >
          Previous
        </button>
        <p>
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
  );
}
