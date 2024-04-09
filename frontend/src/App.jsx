import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UserDataContext } from "./contexts/UserDataContext";
import { API_URL } from "./utils/constants";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  const { dispatch } = useContext(UserDataContext);

  const getUserDetails = async () => {
    dispatch({ type: "USER_DATA_LOADING" });
    try {
      const data = await axios.get(API_URL + "/user/profile", {
        withCredentials: true,
      });
      const { user } = data?.data;
      // setTimeout(() => {
      dispatch({ type: "USER_DATA", payload: user });
      // }, 15000);
    } catch (error) {
      dispatch({ type: "USER_DATA_ERROR" });
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
