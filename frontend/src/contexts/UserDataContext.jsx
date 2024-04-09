import { createContext, useReducer } from "react";

import { initState, userDataReducer } from "../reducers/userDataReducer";

export const UserDataContext = createContext();
export const UserDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, initState);
  return (
    <UserDataContext.Provider value={{ state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};
