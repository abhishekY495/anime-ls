export const initState = {
  userData: {},
  userDataLoading: false,
  userDataError: false,
  authenticatingUser: true,
  //
  addListLoading: false,
  addListError: false,
  //
  deleteListLoading: false,
  deleteListError: false,
  //
  addAnimeLoading: false,
  addAnimeError: false,
  //
  removeAnimeLoading: false,
  removeAnimeError: false,
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
    //
    case "ADD_LIST_LOADING": {
      return {
        ...state,
        addListLoading: true,
        addListError: false,
      };
    }
    case "ADD_LIST": {
      const data = action.payload;
      return {
        ...state,
        userData: data,
        addListLoading: false,
        addListError: false,
      };
    }
    case "ADD_LIST_ERROR": {
      return {
        ...state,
        addListLoading: false,
        addListError: true,
      };
    }
    //
    case "DELETE_LIST_LOADING": {
      return {
        ...state,
        deleteListLoading: true,
        deleteListError: false,
      };
    }
    case "DELETE_LIST": {
      const data = action.payload;
      return {
        ...state,
        userData: data,
        deleteListLoading: false,
        deleteListError: false,
      };
    }
    case "DELETE_LIST_ERROR": {
      return {
        ...state,
        deleteListLoading: false,
        deleteListError: true,
      };
    }
    //
    case "ADD_ANIME_TO_LIST_LOADING": {
      return {
        ...state,
        addAnimeLoading: true,
        addAnimeError: false,
      };
    }
    case "ADD_ANIME_TO_LIST": {
      const data = action.payload;
      return {
        ...state,
        userData: data,
        addAnimeLoading: false,
        addAnimeError: false,
      };
    }
    case "ADD_ANIME_TO_LIST_ERROR": {
      return {
        ...state,
        addAnimeLoading: false,
        addAnimeError: true,
      };
    }
    //
    case "REMOVE_ANIME_FROM_LIST_LOADING": {
      return {
        ...state,
        removeAnimeLoading: true,
        removeAnimeError: false,
      };
    }
    case "REMOVE_ANIME_FROM_LIST": {
      const data = action.payload;
      return {
        ...state,
        userData: data,
        removeAnimeLoading: false,
        removeAnimeError: false,
      };
    }
    case "REMOVE_ANIME_FROM_LIST_ERROR": {
      return {
        ...state,
        removeAnimeLoading: false,
        removeAnimeError: true,
      };
    }
  }
};
