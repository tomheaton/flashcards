import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FlashcardType } from "../types";

export default function Test() {
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
      <h1 className="text-4xl font-extrabold tracking-tighter">test</h1>
      <div className="space-x-4">
        <Link to={`/create`}>
          <button>Create</button>
        </Link>
        <Link to={`/questions`}>
          <button>Questions</button>
        </Link>
        <Link to={`/`}>
          <button>Home</button>
        </Link>
      </div>
      <br />
      <div className="text-sm font-bold">{data[counter]?.question}</div>
      {showAnswer && <div className="text-sm">{data[counter]?.answer}</div>}
      <br />
      <button onClick={() => setShowAnswer((p) => !p)}>toggle answer</button>
      <br />
      <div className="flex space-x-4">
        <button onClick={() => setCounter((p) => (p > 0 ? p - 1 : data.length - 1))}>
          previous
        </button>
        <p>
          {counter + 1} / {data.length}
        </p>
        <button onClick={() => setCounter((p) => (p < data.length - 1 ? p + 1 : 0))}>next</button>
      </div>
    </div>
  );
}
