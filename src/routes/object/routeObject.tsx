import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login, { action as loginAction, loader as loginLoader } from "../Login";
import postRouter from "./postRouter";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        loader: loginLoader,
        action: loginAction,
        element: <Login />,
      },
      ...postRouter(),
    ],
  },
];

export const browserRouter = createBrowserRouter(routes);
