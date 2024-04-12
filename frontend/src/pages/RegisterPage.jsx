import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Register } from "../components/Register";
import { UserDataContext } from "../contexts/UserDataContext";
import { registerUser } from "../services/authentication/registerUser";

export const RegisterPage = () => {
  const { state, dispatch } = useContext(UserDataContext);
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
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
    registerUser(userData, dispatch, navigate);
  };

  useEffect(() => {
    if (state.userData.username) {
      navigate("/dashboard");
    }
  });

  return (
    <Register
      inputChangeHandler={inputChangeHandler}
      formSubmitHandler={formSubmitHandler}
      userDataLoading={state.userDataLoading}
    />
  );
};
