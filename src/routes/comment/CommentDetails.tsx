import React from "react";
import {
  Link,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
} from "react-router-dom";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const loader = (e: LoaderFunctionArgs) => {
  const { commentId } = e.params;
  return fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
};

const PostDetails = () => {
  const comment = useLoaderData() as Comment;
  return (
    <>
      <div
        style={{
          maxHeight: "30rem",
          maxWidth: "30rem",
          minWidth: "10rem",
          overflowY: "scroll",
        }}
      >
        <Link to="./edit" aria-label={`edit-comment-${comment.id}`}>
          Edit
        </Link>
        <h2>Comment details</h2>
        <p>id: {comment.id}</p>
        <p>name: {comment.name}</p>
        <p>body: {comment.body}</p>
        <p>email: {comment.email}</p>
      </div>
      <Outlet />
    </>
  );
};

export default PostDetails;
