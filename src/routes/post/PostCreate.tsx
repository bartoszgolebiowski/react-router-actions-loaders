import React from "react";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";

export const action = async (e: ActionFunctionArgs) => {
  const formData = await e.request.formData();

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const userId = formData.get("userId") as string;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId: Number(userId),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  const json = await res.json();
  return redirect("/post/" + json.id);
};

const PostCreate = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Form method="post">
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input hidden defaultValue={100} name="userId" />
          <legend>Create Post</legend>
          <label htmlFor="title">Title</label>
          <input required type="text" name="title" id="title" />
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            required
            style={{
              maxWidth: "30rem",
              maxHeight: "20rem",
              width: "30rem",
              height: "20rem",
            }}
          />
          <button type="submit" style={{ marginTop: "1rem" }}>
            Create
          </button>
        </fieldset>
      </Form>
    </div>
  );
};

export default PostCreate;
