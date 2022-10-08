import React from "react";
import Comments, { loader as commentsLoader } from "../routes/comment/Comments";
import CommentDetails, {
  loader as commentLoader,
} from "../routes/comment/CommentDetails";
import CommentCreate, {
  action as createCommentAction,
} from "../routes/comment/CommentCreate";
import CommentEdit, {
  loader as deferCommentLoader,
  action as editCommentAction,
} from "../routes/comment/CommentEdit";

export const actionsDefault = {
  editCommentAction,
  createCommentAction,
};

export const loadersDefault = {
  deferCommentLoader,
  commentLoader,
  commentsLoader,
};

const commentRouter = (actions = actionsDefault, loaders = loadersDefault) => {
  const { editCommentAction, createCommentAction } = actions;
  const { deferCommentLoader, commentLoader, commentsLoader } = loaders;

  return [
    {
      path: "comment",
      loader: commentsLoader,
      element: <Comments />,
      children: [
        {
          path: "new",
          action: createCommentAction,
          element: <CommentCreate />,
        },
        {
          path: ":commentId",
          loader: commentLoader,
          element: <CommentDetails />,
          children: [
            {
              path: "edit",
              loader: deferCommentLoader,
              action: editCommentAction,
              element: <CommentEdit />,
            },
          ],
        },
      ],
    },
  ];
};

export default commentRouter;
