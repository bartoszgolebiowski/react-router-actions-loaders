import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  defer,
  json,
  RouterProvider,
} from "react-router-dom";
import commentRouter from "../commentRouter";
import { vi } from "vitest";

const comments = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
];

describe("commentRoute", () => {
  it("should return render comments table and create link", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(
          commentRouter(
            {
              editCommentAction: vi.fn(),
              createCommentAction: vi.fn(),
            },
            {
              deferCommentLoader: () =>
                defer({
                  comment: new Promise((res) =>
                    setTimeout(() => res(comments[0]), 500)
                  ),
                }),
              commentLoader: async () => json(comments[0]),
              commentsLoader: async () => json(comments),
            }
          ),
          {
            initialEntries: ["/", "/comment"],
            initialIndex: 1,
          }
        )}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Comments")).toBeDefined();
    });
    expect(screen.getByText("Create")).toBeDefined();
    expect(screen.queryAllByRole("row")).toHaveLength(comments.length + 1);
  });

  it("should redirect to comment details after clicking on id", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(
          commentRouter(
            {
              editCommentAction: vi.fn(),
              createCommentAction: vi.fn(),
            },
            {
              deferCommentLoader: () =>
                defer({
                  comment: new Promise((res) =>
                    setTimeout(() => res(comments[0]), 500)
                  ),
                }),
              commentLoader: async () => json(comments[0]),
              commentsLoader: async () => json(comments),
            }
          ),
          {
            initialEntries: ["/", "/comment"],
            initialIndex: 1,
          }
        )}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Comments")).toBeDefined();
    });
    userEvent.click(
      screen.getByRole("link", {
        name: /1/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeDefined();
    });
  });

  it("should render create form after clicking on create link", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(
          commentRouter(
            {
              editCommentAction: vi.fn(),
              createCommentAction: vi.fn(),
            },
            {
              deferCommentLoader: () =>
                defer({
                  comment: new Promise((res) =>
                    setTimeout(() => res(comments[0]), 500)
                  ),
                }),
              commentLoader: async () => json(comments[0]),
              commentsLoader: async () => json(comments),
            }
          ),
          {
            initialEntries: ["/", "/comment"],
            initialIndex: 1,
          }
        )}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Comments")).toBeDefined();
    });
    userEvent.click(screen.getByText("Create"));
    expect(screen.getByText("Create Comment")).toBeDefined();
    expect(screen.queryAllByRole("textbox")).toHaveLength(3);
    expect(
      screen.getByRole("button", {
        name: /create/i,
      })
    ).toBeDefined();
  });

  it("should invoke action after submitting create form", async () => {
    const createCommentAction = vi.fn();
    render(
      <RouterProvider
        router={createMemoryRouter(
          commentRouter(
            {
              editCommentAction: vi.fn(),
              createCommentAction,
            },
            {
              deferCommentLoader: () =>
                defer({
                  comment: new Promise((res) =>
                    setTimeout(() => res(comments[0]), 500)
                  ),
                }),
              commentLoader: async () => json(comments[0]),
              commentsLoader: async () => json(comments),
            }
          ),
          {
            initialEntries: ["/", "/comment"],
            initialIndex: 1,
          }
        )}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Comments")).toBeDefined();
    });
    userEvent.click(screen.getByText("Create"));
    userEvent.type(screen.getAllByRole("textbox")[0], "name");
    userEvent.type(screen.getAllByRole("textbox")[1], "email@gmail.com");
    userEvent.type(screen.getAllByRole("textbox")[2], "lorem ipsum");
    userEvent.click(
      screen.getByRole("button", {
        name: /create/i,
      })
    );
    expect(createCommentAction).toHaveBeenCalled();
  });
});
