import axios from "axios";
import toast from "react-hot-toast";

import { API_URL } from "../utils/constants";

const token = localStorage.getItem("token");

export const addAnimeToList = async (
  listId,
  animeData,
  isPrivate,
  dispatch
) => {
  const toastId = toast.loading("Adding Anime");
  try {
    dispatch({ type: "ADD_ANIME_TO_LIST_LOADING" });
    const ADD_ANIME_TO_LIST_API_URL =
      API_URL + `/user/${isPrivate ? "privateList" : "publicList"}/add-anime`;
    const data = await axios.patch(
      ADD_ANIME_TO_LIST_API_URL,
      {
        listId,
        animeData,
      },
      {
        headers: { Authorization: token },
      }
    );
    const { message, user } = data?.data;
    toast.success(message, { id: toastId });
    dispatch({ type: "ADD_ANIME_TO_LIST", payload: user });
  } catch (error) {
    dispatch({ type: "ADD_ANIME_TO_LIST_ERROR" });
    const { message } = error?.response?.data;
    toast.error(message, { id: toastId });
  }
};
