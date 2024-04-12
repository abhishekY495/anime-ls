import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App.jsx";
import { UserDataContextProvider } from "./contexts/UserDataContext";
import { AnimesDataContextProvider } from "./contexts/AnimesDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDataContextProvider>
        <AnimesDataContextProvider>
          <App />
        </AnimesDataContextProvider>
      </UserDataContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
