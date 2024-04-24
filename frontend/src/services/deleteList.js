import toast from "react-hot-toast";
import axios from "axios";

import { API_URL } from "../utils/constants";

const token = localStorage.getItem("token");

export const deleteList = async (
  listId,
  inPrivate,
  closeDeleteConfirmationModal,
  dispatch
) => {
  const toastId = toast.loading("Deleting list");
  dispatch({ type: "DELETE_LIST_LOADING" });
  try {
    const response = await axios.patch(
      API_URL + `/user/${inPrivate ? "privatelist" : "publiclist"}/delete-list`,
      { listId },
      { headers: { Authorization: token } }
    );
    const { message, user } = response?.data;
    toast.success(message, { id: toastId });
    dispatch({ type: "DELETE_LIST", payload: user });
    closeDeleteConfirmationModal();
  } catch (error) {
    dispatch({ type: "DELETE_LIST_ERROR" });
    const { message } = error?.response?.data;
    toast.error(message, { id: toastId });
  }
};
