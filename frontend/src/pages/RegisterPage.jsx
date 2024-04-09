import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { Register } from "../components/Register";
import { UserDataContext } from "../contexts/UserDataContext";
import { validEmailFormat } from "../utils/validEmailFormat";
import { API_URL } from "../utils/constants";

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

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (userData.fullname.trim().length === 0) {
      toast.error("Full Name cannot be empty");
    } else if (userData.username.trim().length === 0) {
      toast.error("Username cannot be empty");
    } else if (userData.email.trim().length === 0) {
      toast.error("Email cannot be empty");
    } else if (!validEmailFormat(userData.email)) {
      toast.error("Invalid email format");
    } else if (userData.password.length === 0) {
      toast.error("Password cannot be empty");
    } else {
      const toastId = toast.loading("Registering");
      try {
        dispatch({ type: "USER_DATA_LOADING" });
        const data = await axios.post(API_URL + "/user/register", userData, {
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
    <Register
      inputChangeHandler={inputChangeHandler}
      formSubmitHandler={formSubmitHandler}
      userDataLoading={state.userDataLoading}
    />
  );
};
