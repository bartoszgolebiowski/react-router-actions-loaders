import React from "react";
import { useRevalidator } from "react-router-dom";

const ErrorElementRetry = () => {
  const revalidator = useRevalidator();
  const handleRetry = () => {
    revalidator.revalidate();
  };

  return (
    <div>
      {revalidator.state === "loading" ? <p>Retrying...</p> : <p>Error :(</p>}
      <button onClick={handleRetry} disabled={revalidator.state === "loading"}>
        Retry
      </button>
    </div>
  );
};

export default ErrorElementRetry;
