import axios from "axios";

import { API_URL } from "../utils/constants";

export const isServerLive = async (setServerLive) => {
  try {
    const response = await axios.get(API_URL);
    const { live } = await response?.data;
    setServerLive(live);
    localStorage.setItem("showDisclaimer", false);
  } catch (error) {
    console.error(error);
  }
};
