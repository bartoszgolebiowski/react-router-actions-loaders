import React from "react";
import {
  Link,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
} from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const loader = (e: LoaderFunctionArgs) => {
  const { postId } = e.params;
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};

const PostDetails = () => {
  const post = useLoaderData() as Post;
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
        <Link to="./edit" aria-label={`edit-post-${post.id}`}>
          Edit
        </Link>
        <h2>Post details</h2>
        <p>id: {post.id}</p>
        <p>userId: {post.userId}</p>
        <p>title: {post.title}</p>
        <p>body: {post.body}</p>
        <Link to="./comment">comments</Link>
      </div>
      <Outlet />
    </>
  );
};

export default PostDetails;
