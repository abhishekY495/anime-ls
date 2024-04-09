export const initState = {
  userData: {},
  userDataLoading: false,
  userDataError: false,
  authenticatingUser: true,
};

export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "USER_DATA_LOADING": {
      return { ...state, userDataLoading: true };
    }
    case "USER_DATA": {
      const data = action.payload;
      return {
        ...state,
        userData: data,
        userDataLoading: false,
        userDataError: false,
        authenticatingUser: false,
      };
    }
    case "USER_DATA_ERROR": {
      return {
        ...state,
        userDataLoading: false,
        userDataError: true,
        authenticatingUser: false,
      };
    }
  }
};
