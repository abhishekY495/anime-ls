import React, { useContext } from "react";

import { UserDataContext } from "../contexts/UserDataContext";
import { UserDetails } from "../components/UserDetails";

export const DashboardPage = () => {
  const {
    state: { userData },
    dispatch,
  } = useContext(UserDataContext);

  return <UserDetails userData={userData} dispatch={dispatch} />;
};
