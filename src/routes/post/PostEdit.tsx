import React from "react";
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const action = async (e: ActionFunctionArgs) => {
  const { postId } = e.params;
  const formData = await e.request.formData();

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const id = formData.get("id") as string;
  const userId = formData.get("userId") as string;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
        id: Number(id),
        userId: Number(userId),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return redirect("/post/" + postId);
};

const PostEdit = () => {
  const post = useLoaderData() as Post;

  return (
    <div style={{ padding: "1rem" }}>
      <Form method="put">
        <fieldset style={{ display: "flex", flexDirection: "column" }}>
          <input hidden defaultValue={post.id} name="id" />
          <input hidden defaultValue={post.userId} name="userId" />
          <legend>Edit Post</legend>
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            defaultValue={post.title}
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
            defaultValue={post.body}
          />
          <button type="submit" style={{ marginTop: "1rem" }}>
            Edit
          </button>
        </fieldset>
      </Form>
    </div>
  );
};

export default PostEdit;
