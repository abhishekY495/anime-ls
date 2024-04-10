import toast from "react-hot-toast";
import axios from "axios";

import { API_URL } from "../../utils/constants";

const LOGIN_API_URL = API_URL + "/user/login";

export const loginUser = async (e, userData, dispatch, navigate) => {
  e.preventDefault();
  if (userData.username.trim().length === 0) {
    toast.error("Username cannot be empty");
  } else if (userData.password.length === 0) {
    toast.error("Password cannot be empty");
  } else {
    const toastId = toast.loading("Logging In");
    try {
      dispatch({ type: "USER_DATA_LOADING" });
      const data = await axios.post(LOGIN_API_URL, userData);
      const { message, user, token } = data?.data;
      localStorage.setItem("token", token);
      toast.success(message, { id: toastId });
      dispatch({ type: "USER_DATA", payload: user });
      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: "USER_DATA_ERROR" });
      const { message } = error?.response?.data;
      toast.error(message, { id: toastId });
    }
  }
};
