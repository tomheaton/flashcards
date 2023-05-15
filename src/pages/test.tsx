import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlashcardType } from "../types";
import { readData } from "../utils/file";

export default function Test() {
  const [data, setData] = useState<FlashcardType[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  // TODO: move logic to router data generator
  useEffect(() => {
    (async () => {
      const data = await readData();
      if (data) {
        console.log("Data file found");
        // TODO: use zod to validate data
        setData(JSON.parse(data) as FlashcardType[]);
      }
    })();
  }, []);

  // move to buttons
  useEffect(() => {
    setShowAnswer(false);
  }, [counter]);

  return (
    <div className="mt-20 flex h-screen w-full flex-col items-center">
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
      <p>
        {counter + 1} / {data.length}
      </p>
      <br />
      <div className="text-sm font-bold">{data[counter]?.question}</div>
      {showAnswer && <div className="text-sm">{data[counter]?.answer}</div>}
      <br />
      <button onClick={() => setShowAnswer((p) => !p)}>toggle answer</button>
      <br />
      <div className="space-x-4">
        <button onClick={() => setCounter((p) => (p > 0 ? p - 1 : data.length - 1))}>
          previous
        </button>
        <button onClick={() => setCounter((p) => (p < data.length - 1 ? p + 1 : 0))}>next</button>
      </div>
    </div>
  );
}
