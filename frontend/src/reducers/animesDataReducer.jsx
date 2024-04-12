export const initState = {
  searchQuery: "",
  animesData: [],
  pagination: {},
  animesDataLoading: false,
  animesDataError: false,
  animesDataErrorMessage: "",
};

export const animesDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY": {
      const query = action.payload;
      return {
        ...state,
        searchQuery: query,
        animesData: [],
      };
    }
    case "ANIMES_DATA_LOADING": {
      return {
        ...state,
        animesDataLoading: true,
        animesDataError: false,
        animesDataErrorMessage: "",
      };
    }
    case "ANIMES_DATA": {
      const { data, pagination } = action.payload;
      return {
        ...state,
        animesData: [...state.animesData, ...data],
        pagination,
        animesDataLoading: false,
        animesDataError: false,
        animesDataErrorMessage: "",
      };
    }
    case "ANIMES_DATA_ERROR": {
      const message = action.payload;
      return {
        ...state,
        animesDataLoading: false,
        animesDataError: true,
        animesDataErrorMessage: "You are being rate-limited.",
      };
    }
    case "CLEAR_ANIMES_DATA": {
      return {
        ...state,
        animesData: [],
        animesDataLoading: false,
        animesDataError: false,
        animesDataErrorMessage: "",
      };
    }
  }
};
