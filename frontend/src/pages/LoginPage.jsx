import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "../components/Login";
import { UserDataContext } from "../contexts/UserDataContext";
import { loginUser } from "../services/authentication/loginUser";

export const LoginPage = () => {
  const { state, dispatch } = useContext(UserDataContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const data = {
      ...userData,
      [e.target.name]: e.target.value,
    };
    setUserData(data);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(userData, dispatch, navigate);
  };

  useEffect(() => {
    if (state.userData.username) {
      navigate("/dashboard");
    }
  });

  return (
    <Login
      inputChangeHandler={inputChangeHandler}
      formSubmitHandler={formSubmitHandler}
      userDataLoading={state.userDataLoading}
    />
  );
};
