const env = import.meta.env.VITE_ENV;

const localApiUrl = import.meta.env.VITE_LOCAL_API_URL;
const deployedApiUrl = import.meta.env.VITE_DEPLOYED_API_URL;

const localAppLink = "http://localhost:5173/";
const deployedAppLink = "https://anime-ls.pages.dev/";

export const API_URL = env === "PROD" ? deployedApiUrl : localApiUrl;
export const APP_LINK = env === "PROD" ? deployedAppLink : localAppLink;

export const ANIME_SEARCH_API_URL = import.meta.env.VITE_ANIME_SEARCH_API_URL;
