import React from "react";
import { Link } from "react-router-dom";

export const NoListsMessage = ({ isPrivate }) => {
  return (
    <p className="text-center">
      No Lists found <br />
      Go to{" "}
      <Link to="/lists" className="fw-semibold">
        Your Lists
      </Link>{" "}
      and create a{" "}
      <span className="fw-semibold">{isPrivate ? "Private" : "Public"}</span>{" "}
      List
    </p>
  );
};
