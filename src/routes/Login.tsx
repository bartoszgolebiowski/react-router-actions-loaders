import React from "react";
import { Form, LoaderFunctionArgs, redirect } from "react-router-dom";
import { isLogged, logIn } from "../api/login";

export const action = () => {
  logIn();
  return redirect("/");
};

export const loader = () => {
  if (isLogged) {
    return redirect("/");
  }
  return null;
};

export const userLoader =
  (customLodaer?: (e: LoaderFunctionArgs) => Promise<any>) =>
  (e: LoaderFunctionArgs) => {
    if (!isLogged) {
      return redirect("/login");
    }
    return customLodaer ? customLodaer(e) : (() => {})();
  };

const Login = () => {
  return (
    <Form method="post">
      <fieldset
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "30rem",
        }}
      >
        <legend>Login</legend>
        <label htmlFor="email">Email</label>
        <input required type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input required type="password" name="password" />
        <button type="submit" style={{ marginTop: "1rem" }}>
          Login
        </button>
      </fieldset>
    </Form>
  );
};

export default Login;
