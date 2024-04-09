import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const data = {
      ...userData,
      [e.target.name]: e.target.value,
    };
    setUserData(data);
  };

  const toastChangeHandler = () => setShowToast(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (userData.fullname.trim().length === 0) {
      setToastColor("danger");
      setToastText("Full Name cannot be empty");
      setShowToast(true);
    } else if (userData.username.trim().length === 0) {
      setToastColor("danger");
      setToastText("Username cannot be empty");
      setShowToast(true);
    } else if (userData.email.trim().length === 0) {
      setToastColor("danger");
      setToastText("Email cannot be empty");
      setShowToast(true);
    } else if (!validEmailFormat(userData.email)) {
      setToastColor("danger");
      setToastText("Invalid Email format");
      setShowToast(true);
    } else if (userData.password.length === 0) {
      setToastColor("danger");
      setToastText("Password cannot be empty");
      setShowToast(true);
    } else {
      try {
        dispatch({ type: "USER_DATA_LOADING" });
        const data = await axios.post(API_URL + "/user/register", userData, {
          withCredentials: true,
        });
        const { message, user } = data?.data;
        setToastColor("success");
        setToastText(message);
        setShowToast(true);
        dispatch({ type: "USER_DATA", payload: user });
        navigate("/dashboard");
      } catch (error) {
        dispatch({ type: "USER_DATA_ERROR" });
        const { message } = error?.response?.data;
        setToastColor("danger");
        setToastText(message || "Something went wrong");
        setShowToast(true);
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
      toastChangeHandler={toastChangeHandler}
      showToast={showToast}
      toastText={toastText}
      toastColor={toastColor}
    />
  );
};
