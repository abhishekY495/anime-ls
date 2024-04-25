import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavBar } from "./components/NavBar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SearchPage } from "./pages/SearchPage";
import { ListsPage } from "./pages/ListsPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import { PrivateListWithAnimesPage } from "./pages/PrivateListWithAnimesPage";
import { PublicListWithAnimesPage } from "./pages/PublicListWithAnimesPage";
import { DisclaimerModal } from "./components/modals/DisclaimerModal";
import { UserDataContext } from "./contexts/UserDataContext";
import { isAuthenticated } from "./services/authentication/isAuthenticated";
import { isServerLive } from "./services/isServerLive";
import { PublicProfileListWithAnimesPage } from "./pages/PublicProfileListWithAnimesPage";

export const App = () => {
  const [serverLive, setServerLive] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(
    localStorage.getItem("showDisclaimer") === "false" ? false : true
  );
  const { dispatch } = useContext(UserDataContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    isServerLive(setServerLive);
    if (token !== null) {
      isAuthenticated(token, dispatch);
    } else {
      dispatch({ type: "USER_DATA_ERROR" });
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div className="main-app">
      {showDisclaimer && <DisclaimerModal serverLive={serverLive} />}
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
        <Route
          path="/lists"
          element={
            <ProtectedRoute>
              <ListsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username/private/:listId"
          element={
            <ProtectedRoute>
              <PrivateListWithAnimesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username/public/:listId"
          element={
            <ProtectedRoute>
              <PublicListWithAnimesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:username" element={<PublicProfilePage />} />
        <Route
          path="/user/:username/:listId"
          element={<PublicProfileListWithAnimesPage />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
