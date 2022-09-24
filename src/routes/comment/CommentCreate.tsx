import React from "react";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";

export const action = async (e: ActionFunctionArgs) => {
  const { postId } = e.params;
  const formData = await e.request.formData();

  const name = formData.get("name") as string;
  const body = formData.get("body") as string;
  const email = formData.get("email") as string;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        body,
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
  const json = await res.json();
  return redirect("/post/" + postId + "/comment/" + json.id);
};

const CommentCreate = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Form method="post">
        <fieldset style={{ display: "flex", flexDirection: "column" }}>
          <input hidden name="id" />
          <input hidden name="postId" />
          <legend>Create Comment</legend>
          <label htmlFor="name">Name</label>
          <input required type="text" name="name" id="name" />
          <label htmlFor="email">Email</label>
          <input required type="email" name="email" id="email" />
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
          />
          <button type="submit" style={{ marginTop: "1rem" }}>
            Create
          </button>
        </fieldset>
      </Form>
    </div>
  );
};

export default CommentCreate;
