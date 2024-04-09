import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { Login } from "../components/Login";
import { UserDataContext } from "../contexts/UserDataContext";
import { API_URL } from "../utils/constants";

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

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (userData.username.trim().length === 0) {
      toast.error("Username cannot be empty");
    } else if (userData.password.length === 0) {
      toast.error("Password cannot be empty");
    } else {
      const toastId = toast.loading("Logging In");
      try {
        dispatch({ type: "USER_DATA_LOADING" });
        const data = await axios.post(API_URL + "/user/login", userData, {
          withCredentials: true,
        });
        const { message, user } = data?.data;
        toast.success(message, { id: toastId });
        dispatch({ type: "USER_DATA", payload: user });
        navigate("/dashboard");
      } catch (error) {
        dispatch({ type: "USER_DATA_ERROR" });
        const { message } = error?.response?.data;
        toast.error(message, { id: toastId });
      }
    }
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
