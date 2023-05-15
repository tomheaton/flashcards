import "./styles.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/create";
import Error from "./pages/error";
import Home from "./pages/home";
import Questions from "./pages/questions";
import Test from "./pages/test";

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
  },
  {
    path: "/test",
    element: <Test />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
