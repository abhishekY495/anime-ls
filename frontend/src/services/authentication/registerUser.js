import toast from "react-hot-toast";
import axios from "axios";

import { API_URL } from "../../utils/constants";
import { validEmailFormat } from "../../utils/validEmailFormat";

const REGISTER_API_URL = API_URL + "/user/register";

export const registerUser = async (userData, dispatch, navigate) => {
  if (userData.fullname.trim().length === 0) {
    toast.error("Full Name cannot be empty");
  } else if (userData.username.trim().length === 0) {
    toast.error("Username cannot be empty");
  } else if (userData.email.trim().length === 0) {
    toast.error("Email cannot be empty");
  } else if (!validEmailFormat(userData.email)) {
    toast.error("Invalid email format");
  } else if (userData.password.length === 0) {
    toast.error("Password cannot be empty");
  } else {
    const toastId = toast.loading("Registering");
    try {
      dispatch({ type: "USER_DATA_LOADING" });
      const data = await axios.post(REGISTER_API_URL, userData);
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
