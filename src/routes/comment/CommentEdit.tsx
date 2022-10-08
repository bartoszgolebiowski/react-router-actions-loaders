import React from "react";
import {
  ActionFunctionArgs,
  Await,
  defer,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import ErrorElementRetry from "../../components/ErrorElementRetry";

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export const loader = (e: LoaderFunctionArgs) => {
  const { commentId } = e.params;
  const comment = new Promise((res, rej) => {
    setTimeout(() => {
      Math.random() > 0.5
        ? res(
            fetch(
              `https://jsonplaceholder.typicode.com/comments/${commentId}`
            ).then((res) => res.json())
          )
        : rej("Error");
    }, 2000);
  });
  return defer({ comment });
};

export const action = async (e: ActionFunctionArgs) => {
  const { commentId } = e.params;
  const formData = await e.request.formData();

  const name = formData.get("name") as string;
  const body = formData.get("body") as string;
  const email = formData.get("email") as string;
  const id = formData.get("id") as string;
  const postId = formData.get("postId") as string;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${postId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        name,
        email,
        body,
        id: Number(id),
        postId: Number(postId),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to update comment");
  }

  return redirect("/post/" + postId + "/comment/" + commentId);
};

const CommentEdit = () => {
  const res = useLoaderData() as { comment: Promise<Comment> };

  return (
    <React.Suspense fallback={<p>Loading comment...</p>}>
      <Await resolve={res.comment} errorElement={<ErrorElementRetry />}>
        {(comment) => (
          <div style={{ padding: "1rem" }}>
            <Form method="put">
              <fieldset style={{ display: "flex", flexDirection: "column" }}>
                <input hidden defaultValue={comment.id} name="id" id="id" />
                <input
                  hidden
                  defaultValue={comment.postId}
                  name="postId"
                  id="postId"
                />
                <legend>Edit Comment</legend>
                <label htmlFor="title">Name</label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={comment.name}
                />
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={comment.email}
                />
                <label htmlFor="body">Body</label>
                <textarea
                  required
                  name="body"
                  id="body"
                  style={{
                    maxWidth: "30rem",
                    maxHeight: "20rem",
                    width: "30rem",
                    height: "20rem",
                  }}
                  defaultValue={comment.body}
                />
                <button type="submit" style={{ marginTop: "1rem" }}>
                  Edit
                </button>
              </fieldset>
            </Form>
          </div>
        )}
      </Await>
    </React.Suspense>
  );
};

export default CommentEdit;
