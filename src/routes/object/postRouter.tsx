import React from "react";
import Posts, { loader as postsLoader } from "../post/Posts";
import PostDetails, { loader as postLoader } from "../post/PostDetails";
import PostCreate, { action as createPostAction } from "../post/PostCreate";
import PostEdit, { action as editPostAction } from "../post/PostEdit";
import commentRouter, {
  actionsDefault as commentActionsDefault,
  loadersDefault as commentLoadersDefault,
} from "./commentRouter";

const actionsDefault = {
  editPostAction,
  createPostAction,
};

const loadersDefault = {
  postLoader,
  postsLoader,
};

const postRouter = (
  actions = actionsDefault,
  loaders = loadersDefault,
  actionsComment = commentActionsDefault,
  loadersComment = commentLoadersDefault
) => {
  const { editPostAction, createPostAction } = actions;
  const { postLoader, postsLoader } = loaders;

  return [
    {
      path: "post",
      loader: postsLoader,
      element: <Posts />,
      children: [
        {
          path: "new",
          action: createPostAction,
          element: <PostCreate />,
        },
        {
          path: ":postId",
          loader: postLoader,
          element: <PostDetails />,
          children: [
            {
              path: "edit",
              action: editPostAction,
              element: <PostEdit />,
            },
            ...commentRouter(actionsComment, loadersComment),
          ],
        },
      ],
    },
  ];
};

export default postRouter;
