import axios from "axios";
import toast from "react-hot-toast";

import { ANIME_SEARCH_API_URL } from "../utils/constants";

export const searchAnime = async (searchQuery, page, dispatch) => {
  if (searchQuery.length === 0) {
    toast.error("Cannot be empty");
  } else {
    dispatch({ type: "ANIMES_DATA_LOADING" });
    try {
      const response = await axios.get(
        ANIME_SEARCH_API_URL + `&page=${page}&q=${searchQuery}`
      );
      const { data, pagination } = response?.data;
      dispatch({
        type: "ANIMES_DATA",
        payload: { data, pagination },
      });
    } catch (error) {
      dispatch({ type: "ANIMES_DATA_ERROR" });
    }
  }
};
