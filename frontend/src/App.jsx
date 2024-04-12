import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UserDataContext } from "./contexts/UserDataContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { isAuthenticated } from "./services/authentication/isAuthenticated";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SearchPage } from "./pages/SearchPage";
import "./style.css";

export const App = () => {
  const { dispatch } = useContext(UserDataContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token !== null) {
      isAuthenticated(token, dispatch);
    } else {
      dispatch({ type: "USER_DATA_ERROR" });
      localStorage.clear();
    }
  }, []);

  return (
    <div className="main-app">
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#404040", color: "#fff" } }}
        containerStyle={{ top: 10 }}
      />
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
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
