import axios from "axios";

import { API_URL } from "../utils/constants";

export const getPublicProfileData = async (username, dispatch) => {
  dispatch({ type: "SET_PUBLIC_PROFILE_USER_DATA_LOADING" });
  try {
    const data = await axios.get(API_URL + `/user/${username}`);
    dispatch({ type: "SET_PUBLIC_PROFILE_USER_DATA", payload: data.data });
  } catch (error) {
    dispatch({ type: "SET_PUBLIC_PROFILE_USER_DATA_ERROR" });
  }
};
