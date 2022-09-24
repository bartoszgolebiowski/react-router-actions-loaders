import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                };
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/post"
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                };
              }}
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                };
              }}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
