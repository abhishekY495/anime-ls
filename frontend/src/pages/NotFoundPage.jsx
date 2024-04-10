import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="mt-3 d-flex flex-column align-items-center">
      <h2 className="fs-1 m-0">404</h2>
      <p className="fs-5 m-0">Not Found</p>
      <p className="fs-5">
        Go back <Link to="/">Home</Link>
      </p>
    </div>
  );
};
