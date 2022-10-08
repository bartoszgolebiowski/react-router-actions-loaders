import { createBrowserRouter } from "react-router-dom";
import App from "../routes/App";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "../routes/Login";
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
