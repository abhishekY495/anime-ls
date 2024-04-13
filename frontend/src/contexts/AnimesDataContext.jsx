import { createContext, useReducer } from "react";

import { initState, animesDataReducer } from "../reducers/animesDataReducer";

export const AnimesDataContext = createContext();
export const AnimesDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(animesDataReducer, initState);

  return (
    <AnimesDataContext.Provider value={{ state, dispatch }}>
      {children}
    </AnimesDataContext.Provider>
  );
};
