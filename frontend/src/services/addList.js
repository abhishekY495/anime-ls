import axios from "axios";
import toast from "react-hot-toast";

import { API_URL } from "../utils/constants";

export const addList = async (
  listName,
  isPrivate,
  hideNewListModal,
  dispatch
) => {
  if (listName.trim().length === 0) {
    toast.error("Cannot be empty");
  } else {
    const token = localStorage.getItem("token");
    const toastId = toast.loading("Adding list");
    try {
      dispatch({ type: "ADD_LIST_LOADING" });
      const ADD_LIST_API_URL =
        API_URL + `/user/${isPrivate ? "privatelist" : "publiclist"}/add-list`;
      const data = await axios.put(
        ADD_LIST_API_URL,
        { listName },
        {
          headers: { Authorization: token },
        }
      );
      const { message, user } = data?.data;
      toast.success(message, { id: toastId });
      dispatch({ type: "ADD_LIST", payload: user });
      hideNewListModal();
    } catch (error) {
      dispatch({ type: "ADD_LIST_ERROR" });
      const { message } = error?.response?.data;
      toast.error(message, { id: toastId });
    }
  }
};
