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
  const { postId } = e.params;
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
};

const Comments = () => {
  const comments = useLoaderData() as Comment[];

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          maxHeight: "30rem",
          maxWidth: "30rem",
          overflowY: "scroll",
        }}
      >
        <Link to="./new" aria-label="Create comment">
          Create
        </Link>
        <h2>Comments</h2>
        <table
          aria-label="Comments"
          style={{
            border: "1px solid black",
            padding: "1rem",
          }}
        >
          <thead>
            <tr>
              <td>id</td>
              <th>name</th>
              <th>body</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link
                    to={`./${post.id}`}
                    aria-label={`details-comment-${post.id}`}
                  >
                    {[post.id]}
                  </Link>
                </td>
                <td>{post.name.slice(0, 20)}</td>
                <td>{post.body.slice(0, 20)}</td>
                <td>{post.email.slice(0, 20)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};

export default Comments;
