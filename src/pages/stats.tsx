import { useLoaderData } from "react-router-dom";
import Header from "../components/header";
import type { StatsType } from "../utils/types";

export default function Stats() {
  const data = useLoaderData() as StatsType;

  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center">
        <p className="text-sm font-semibold">
          Total: <span className="text-emerald-500">{data.total}</span>
        </p>
        <p className="text-sm font-semibold">
          Correct: <span className="text-emerald-500">{data.correct}</span>
        </p>
        <p className="text-sm font-semibold">
          Incorrect: <span className="text-red-500">{data.incorrect}</span>
        </p>
      </main>
    </div>
  );
}
