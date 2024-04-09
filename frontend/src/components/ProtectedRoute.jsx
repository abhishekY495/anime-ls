import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserDataContext } from "../contexts/UserDataContext";
import { SpinnerLoader } from "./SpinnerLoader";

export const ProtectedRoute = ({ children }) => {
  const {
    state: { userData, authenticatingUser },
  } = useContext(UserDataContext);

  return authenticatingUser ? (
    <SpinnerLoader />
  ) : userData.username ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
