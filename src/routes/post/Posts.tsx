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
  return fetch("https://jsonplaceholder.typicode.com/posts");
};

const Posts = () => {
  const res = useLoaderData() as Post[];

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          maxHeight: "30rem",
          maxWidth: "30rem",
          overflowY: "scroll",
        }}
      >
        <Link to="./new" aria-label="Create post">
          Create
        </Link>
        <h2>Posts</h2>
        <table
          aria-label="Posts"
          style={{
            border: "1px solid black",
            padding: "1rem",
          }}
        >
          <thead>
            <tr>
              <td>id</td>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {res.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link
                    to={`./${post.id}`}
                    aria-label={`details-post-${post.id}`}
                  >
                    {post.id}
                  </Link>
                </td>
                <td>{post.title.slice(0, 20)}</td>
                <td>{post.body.slice(0, 20)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};

export default Posts;
