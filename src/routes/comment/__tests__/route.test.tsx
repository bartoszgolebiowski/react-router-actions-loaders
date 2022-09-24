import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { routes } from "../../route";
import { vi } from "vitest";

vi.mock("../../../api/login", () => ({
  isLogged: true,
  logIn: () => {},
  logOut: () => {},
}));

describe("route", () => {
  describe("posts", () => {
    beforeEach(async () => {
      render(
        <RouterProvider
          router={createMemoryRouter(routes, {
            initialEntries: ["/post"],
            initialIndex: 1,
          })}
        />
      );
      await waitFor(() =>
        expect(screen.getByRole("table", { name: "Posts" })).toBeDefined()
      );
    });

    it("should render posts table", async () => {
      expect(
        within(screen.getByRole("table", { name: "Posts" })).getAllByRole("row")
          .length
      ).toBeGreaterThan(1);
    });

    it("should render post details, after clicking on details link", async () => {
      userEvent.click(
        screen.getByRole("link", {
          name: "details-post-1",
        })
      );
      await waitFor(() =>
        expect(screen.getByRole("heading", { name: /Post details/i }))
      );
    });

    it("should render edit post, after clicking on details link and edit with default values", async () => {
      userEvent.click(
        screen.getByRole("link", {
          name: "details-post-1",
        })
      );
      await waitFor(() =>
        expect(screen.getByRole("heading", { name: /Post details/i }))
      );
      userEvent.click(
        screen.getByRole("link", {
          name: /edit/i,
        })
      );
      await waitFor(() => expect(screen.getByText(/Edit Post/i)).toBeDefined());
      expect(
        screen.getByDisplayValue(
          /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
        )
      ).toBeDefined();
    });

    it("should render edit post, after clicking on details link and edit with default values, hide edit form after submit", async () => {
      userEvent.click(
        screen.getByRole("link", {
          name: "details-post-1",
        })
      );
      await waitFor(() =>
        expect(screen.getByRole("heading", { name: /Post details/i }))
      );
      userEvent.click(
        screen.getByRole("link", {
          name: /edit/i,
        })
      );
      await waitFor(() => expect(screen.getByText(/Edit Post/i)).toBeDefined());
      expect(
        screen.getByDisplayValue(
          /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
        )
      ).toBeDefined();

      userEvent.click(
        screen.getByRole("button", {
          name: /edit/i,
        })
      );

      await waitForElementToBeRemoved(() =>
        expect(screen.getByText(/Edit Post/i)).toBeDefined()
      );
    });

    it("should render create post form, after clicking on create link", async () => {
      userEvent.click(screen.getByRole("link", { name: /create/i }));
      expect(screen.getByText(/Create Post/i)).toBeDefined();
    });

    it("should render create post form, after clicking on create link, hide create form after submit", async () => {
      userEvent.click(screen.getByRole("link", { name: /create/i }));
      expect(screen.getByText(/Create Post/i)).toBeDefined();

      userEvent.type(screen.getByLabelText(/title/i), "title");
      userEvent.type(screen.getByLabelText(/body/i), "body");
      userEvent.click(screen.getByRole("button", { name: /create/i }));

      await waitForElementToBeRemoved(() =>
        expect(screen.getByText(/Create Post/i)).toBeDefined()
      );
    });
  });

  describe("comments", () => {
    beforeEach(async () => {
      render(
        <RouterProvider
          router={createMemoryRouter(routes, {
            initialEntries: ["/post/1/comment"],
            initialIndex: 1,
          })}
        />
      );
      await waitFor(() =>
        expect(screen.getByRole("table", { name: "Comments" })).toBeDefined()
      );
    });

    it("should render comment table", async () => {
      expect(
        within(screen.getByRole("table", { name: "Comments" })).getAllByRole(
          "row"
        ).length
      ).toBeGreaterThan(1);
    });

    it("should render comment details, after clicking on details link", async () => {
      userEvent.click(
        within(screen.getByRole("table", { name: "Comments" })).getByRole(
          "link",
          {
            name: /details-comment-1/i,
          }
        )
      );
      await waitFor(() =>
        expect(screen.getByRole("heading", { name: /Comment details/i }))
      );
    });

    it("should render create comment form, after clicking on create link", async () => {
      userEvent.click(screen.getByRole("link", { name: /create comment/i }));
      expect(screen.getByText(/Create comment/i)).toBeDefined();
    });

    it("should render create comment form, after clicking on create link, hide create form after submit", async () => {
      userEvent.click(screen.getByRole("link", { name: /create comment/i }));
      expect(screen.getByText(/Create comment/i)).toBeDefined();

      userEvent.type(screen.getByLabelText(/name/i), "title");
      userEvent.type(screen.getByLabelText(/email/i), "title@gmail.com");
      userEvent.type(screen.getByLabelText(/body/i), "body");
      userEvent.click(screen.getByRole("button", { name: /create/i }));

      await waitForElementToBeRemoved(() =>
        expect(screen.getByText(/Create comment/i)).toBeDefined()
      );
    });
  });
});
