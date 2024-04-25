import axios from "axios";

import { API_URL } from "../utils/constants";

export const viewIncrement = async (username, listId) => {
  try {
    await axios.get(`${API_URL}/user/${username}/${listId}`);
  } catch (error) {
    console.error(error);
  }
};
