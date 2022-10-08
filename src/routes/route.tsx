import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import App from "./App";
import Login, {
  action as loginAction,
  loader as loginLoader,
  userLoader,
} from "./Login";
import Posts, { loader as postsLoader } from "./post/Posts";
import PostDetails, { loader as postLoader } from "./post/PostDetails";
import PostCreate, { action as createPostAction } from "./post/PostCreate";
import PostEdit, { action as editPostAction } from "./post/PostEdit";
import Comments, { loader as commentsLoader } from "./comment/Comments";
import CommentDetails, {
  loader as commentLoader,
} from "./comment/CommentDetails";
import CommentCreate, {
  action as createCommentAction,
} from "./comment/CommentCreate";
import CommentEdit, {
  loader as deferCommentLoader,
  action as editCommentAction,
} from "./comment/CommentEdit";
import ErrorElementRetry from "../components/ErrorElementRetry";

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="post" loader={postsLoader} element={<Posts />}>
      <Route index loader={userLoader()} element={<Outlet />} />
      <Route path="new" action={createPostAction} element={<PostCreate />} />
      <Route path=":postId" loader={postLoader} element={<PostDetails />}>
        <Route
          path="edit"
          loader={postLoader}
          action={editPostAction}
          element={<PostEdit />}
        />
        <Route path="comment" loader={commentsLoader} element={<Comments />}>
          <Route
            path="new"
            action={createCommentAction}
            element={<CommentCreate />}
          />
          <Route
            path=":commentId"
            loader={commentLoader}
            element={<CommentDetails />}
          >
            <Route
              path="edit"
              loader={deferCommentLoader}
              action={editCommentAction}
              element={<CommentEdit />}
              errorElement={<ErrorElementRetry />}
            />
          </Route>
        </Route>
      </Route>
    </Route>
    <Route
      path="login"
      loader={loginLoader}
      action={loginAction}
      element={<Login />}
    />
  </Route>
);

export const browserRouter = createBrowserRouter(routes);
