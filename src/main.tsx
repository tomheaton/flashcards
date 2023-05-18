import "./styles.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/create";
import Error from "./pages/error";
import Home from "./pages/home";
import Questions from "./pages/questions";
import Practice from "./pages/practice";
import { FlashcardType } from "./types";
import { readData } from "./utils/file";

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
      return (data ? JSON.parse(data) : []) as FlashcardType[];
    },
  },
  {
    path: "/practice",
    element: <Practice />,
    errorElement: <Error />,
    loader: async () => {
      const data = await readData();
      return (data ? JSON.parse(data) : []) as FlashcardType[];
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
