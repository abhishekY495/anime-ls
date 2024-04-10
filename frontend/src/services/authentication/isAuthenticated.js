import axios from "axios";

import { API_URL } from "../../utils/constants";

const USER_PROFILE_API_URL = API_URL + "/user/profile";

export const isAuthenticated = async (token, dispatch) => {
  dispatch({ type: "USER_DATA_LOADING" });
  try {
    const data = await axios.get(USER_PROFILE_API_URL, {
      headers: { Authorization: token },
    });
    const { user } = data?.data;
    dispatch({ type: "USER_DATA", payload: user });
  } catch (error) {
    dispatch({ type: "USER_DATA_ERROR" });
    localStorage.clear();
  }
};
