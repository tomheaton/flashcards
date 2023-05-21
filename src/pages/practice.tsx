import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../components/header";
import { difficultyLevels } from "../utils/constants";
import { updateFlashcard } from "../utils/file";
import type { FlashcardType } from "../utils/types";

export default function Practice() {
  const data = useLoaderData() as FlashcardType[];

  const easyBtnRef = useRef<HTMLButtonElement>(null);
  const mediumBtnRef = useRef<HTMLButtonElement>(null);
  const hardBtnRef = useRef<HTMLButtonElement>(null);

  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const nextQuestion = () => {
    setShowAnswer(false);
    if (counter === data.length - 1) {
      setIsFinished(true);
      return;
    }
    setCounter((p) => (p < data.length - 1 ? p + 1 : data.length - 1));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;

      if (e.key === "r") {
        setCounter(0);
        setIsFinished(false);
      }

      switch (e.key) {
        case "ArrowLeft":
        case "a":
          if (counter === 0) return;
          setShowAnswer(false);
          setCounter((p) => (p > 0 ? p - 1 : 0));
          break;
        case "ArrowRight":
        case "d":
          nextQuestion();
          break;
        case " ":
          setShowAnswer((p) => !p);
          break;
        case "1":
          if (!showAnswer) return;
          // updateFlashcard(data[counter].id, {
          //   currentDifficulty: "easy",
          // });
          // nextQuestion();
          easyBtnRef.current?.click();
          break;
        case "2":
          if (!showAnswer) return;
          // updateFlashcard(data[counter].id, {
          //   currentDifficulty: "medium",
          // });
          // nextQuestion();
          mediumBtnRef.current?.click();
          break;
        case "3":
          if (!showAnswer) return;
          // updateFlashcard(data[counter].id, {
          //   currentDifficulty: "hard",
          // });
          // nextQuestion();
          hardBtnRef.current?.click();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [counter, showAnswer]);

  if (!data.length) {
    return (
      <div className="flex h-screen w-full flex-col py-20">
        <Header />

        <main className="flex flex-1 flex-col items-center space-y-2">
          <p className="text-sm font-semibold">No flashcards found!</p>
        </main>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex h-screen w-full flex-col py-20">
        <Header />

        <main className="flex flex-1 flex-col items-center space-y-2">
          <p className="text-sm font-semibold">You have finished all the flashcards!</p>
          <button
            className="btn"
            onClick={() => {
              setCounter(0);
              setIsFinished(false);
            }}
          >
            Restart?
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold">{data[counter]?.question}</p>
          {showAnswer && <p>{data[counter]?.answer}</p>}
        </div>

        <div className="flex flex-col space-y-4">
          {showAnswer && (
            <div className="flex space-x-4">
              {difficultyLevels.map((level) => (
                <button
                  ref={
                    level.key === "easy"
                      ? easyBtnRef
                      : level.key === "medium"
                      ? mediumBtnRef
                      : hardBtnRef
                  }
                  key={level.key}
                  className={`btn ${level.textStyle}`}
                  onClick={async () => {
                    await updateFlashcard(data[counter].id, {
                      currentDifficulty: level.key,
                    });

                    setShowAnswer(false);
                    // setCounter((p) => (p < data.length - 1 ? p + 1 : 0));
                    if (counter === data.length - 1) {
                      setIsFinished(true);
                      return;
                    }
                    setCounter((p) => (p < data.length - 1 ? p + 1 : data.length - 1));
                  }}
                >
                  {level.label}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setShowAnswer((p) => !p)} className="btn">
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <div className="flex items-center justify-center space-x-4">
            <button
              className="btn"
              onClick={() => {
                setShowAnswer(false);
                // setCounter((p) => (p > 0 ? p - 1 : data.length - 1));
                setCounter((p) => (p > 0 ? p - 1 : 0));
              }}
              disabled={counter === 0}
            >
              Previous
            </button>
            <p className="text-sm font-semibold">
              {(counter + 1).toLocaleString()} / {data.length.toLocaleString()}
            </p>
            <button
              className="btn"
              onClick={() => {
                setShowAnswer(false);
                // setCounter((p) => (p < data.length - 1 ? p + 1 : 0));
                if (counter === data.length - 1) {
                  setIsFinished(true);
                  return;
                }
                setCounter((p) => (p < data.length - 1 ? p + 1 : data.length - 1));
              }}
            >
              {counter === data.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
