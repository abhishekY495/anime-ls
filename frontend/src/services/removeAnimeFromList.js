import axios from "axios";
import toast from "react-hot-toast";

import { API_URL } from "../utils/constants";

const token = localStorage.getItem("token");

export const removeAnimeFromList = async (
  animeId,
  listId,
  isPrivate,
  dispatch
) => {
  const toastId = toast.loading("Removing Anime");
  try {
    dispatch({ type: "REMOVE_ANIME_FROM_LIST_LOADING" });
    const REMOVE_ANIME_FROM_LIST_API_URL =
      API_URL +
      `/user/${isPrivate ? "privatelist" : "publiclist"}/remove-anime`;
    const data = await axios.patch(
      REMOVE_ANIME_FROM_LIST_API_URL,
      { animeId, listId },
      { headers: { Authorization: token } }
    );
    const { message, user } = data?.data;
    toast.success(message, { id: toastId });
    dispatch({ type: "REMOVE_ANIME_FROM_LIST", payload: user });
  } catch (error) {
    dispatch({ type: "REMOVE_ANIME_FROM_LIST_ERROR" });
    const { message } = error?.response?.data;
    toast.error(message, { id: toastId });
  }
};
