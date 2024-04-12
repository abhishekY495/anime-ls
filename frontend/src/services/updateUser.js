import toast from "react-hot-toast";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { validEmailFormat } from "../utils/validEmailFormat";

const UPDATE_DETAILS_API_URL = API_URL + "/user/profile";
const token = localStorage.getItem("token");

export const updateUser = async (
  fullname,
  email,
  password,
  dispatch,
  setDisableUpdateBtn,
  setPassword
) => {
  if (fullname.trim().length === 0) {
    toast.error("Full Name cannot be empty");
  } else if (email.trim().length === 0) {
    toast.error("Email cannot be empty");
  } else if (!validEmailFormat(email)) {
    toast.error("Invalid Email format");
  } else {
    const toastId = toast.loading("Updating");
    setDisableUpdateBtn(true);
    try {
      dispatch({ type: "USER_DATA_LOADING" });
      const updateData = { fullname, email, password };
      const data = await axios.put(UPDATE_DETAILS_API_URL, updateData, {
        headers: { Authorization: token },
      });
      const { message, user } = data?.data;
      toast.success(message, { id: toastId });
      dispatch({ type: "USER_DATA", payload: user });
      setPassword("");
    } catch (error) {
      dispatch({ type: "USER_DATA_ERROR" });
      const { message } = error?.response?.data;
      toast.error(message, { id: toastId });
    }
  }
};
