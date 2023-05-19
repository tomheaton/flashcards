import "./styles.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/create";
import Error from "./pages/error";
import Home from "./pages/home";
import Practice from "./pages/practice";
import Questions from "./pages/questions";
import Stats from "./pages/stats";
import { readData } from "./utils/file";
import { FlashcardSchema } from "./utils/types";

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
    path: "/questions",
    element: <Questions />,
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
      return {
        total: 420,
        correct: 13,
        incorrect: 69,
      };
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
