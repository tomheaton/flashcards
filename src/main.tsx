import "./styles.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cards from "./pages/cards";
import Create from "./pages/create";
import Error from "./pages/error";
import Home from "./pages/home";
import Practice from "./pages/practice";
import Stats from "./pages/stats";
import { readData } from "./utils/file";
import {
  FlashcardSchema,
  type DifficultyType,
  type FlashcardType,
  type StatsType,
} from "./utils/types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/create",
    element: <Create />,
    errorElement: <Error />,
  },
  {
    path: "/cards",
    element: <Cards />,
    errorElement: <Error />,
    loader: async () => {
      const data = await readData();
      const jsonData = data ? JSON.parse(data) : [];

      return jsonData.flatMap((f: any) => {
        const result = FlashcardSchema.safeParse(f);
        return result.success ? result.data : [];
      });
    },
  },
  {
    path: "/practice",
    element: <Practice />,
    errorElement: <Error />,
    loader: async () => {
      const data = await readData();
      const jsonData = data ? JSON.parse(data) : [];

      return jsonData.flatMap((f: any) => {
        const result = FlashcardSchema.safeParse(f);
        return result.success ? result.data : [];
      });
    },
  },
  {
    path: "/stats",
    element: <Stats />,
    errorElement: <Error />,
    loader: async () => {
      const data = await readData();
      const jsonData = data ? JSON.parse(data) : [];

      const cards = jsonData.flatMap((f: any) => {
        const result = FlashcardSchema.safeParse(f);
        return result.success ? result.data : [];
      }) as FlashcardType[];

      const counts = cards.reduce(
        (acc, curr) => (
          (acc[curr.currentDifficulty] = (acc[curr.currentDifficulty] || 0) + 1), acc
        ),
        {} as Record<DifficultyType, number>,
      );

      const stats: StatsType = {
        total: 0,
        correct: 0,
        incorrect: 0,
        easy: counts.easy || 0,
        medium: counts.medium || 0,
        hard: counts.hard || 0,
      };

      return stats;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
