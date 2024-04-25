import express from "express";

import {
  addAnimeToPrivateList,
  addAnimeToPublicList,
  addPrivateList,
  addPublicList,
  deletePrivateList,
  deletePublicList,
  loginUser,
  registerUser,
  removeAnimeFromPrivateList,
  removeAnimeFromPublicList,
  updateUser,
  userProfile,
  userPublicProfile,
} from "../controllers/userControllers.js";
import { registerUserValidation } from "../middlewares/registerUserValidation.js";
import { loginUserValidation } from "../middlewares/loginUserValidation.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { updateUserValidation } from "../middlewares/updateUserValidation.js";
import { addListValidation } from "../middlewares/addListValidation.js";
import { addAnimeValidation } from "../middlewares/addAnimeValidation.js";

export const userRoutes = express.Router();

userRoutes.post("/register", registerUserValidation, registerUser);
userRoutes.post("/login", loginUserValidation, loginUser);
userRoutes.put("/profile", isAuthenticated, updateUserValidation, updateUser);
userRoutes.get("/profile", isAuthenticated, userProfile);
userRoutes.get("/:username", userPublicProfile);
//
userRoutes.put(
  "/privatelist/add-list",
  isAuthenticated,
  addListValidation,
  addPrivateList
);
userRoutes.patch(
  "/privatelist/delete-list",
  isAuthenticated,
  deletePrivateList
);
userRoutes.patch(
  "/privatelist/add-anime",
  isAuthenticated,
  addAnimeValidation,
  addAnimeToPrivateList
);
userRoutes.patch(
  "/privatelist/remove-anime",
  isAuthenticated,
  removeAnimeFromPrivateList
);
//
userRoutes.put(
  "/publiclist/add-list",
  isAuthenticated,
  addListValidation,
  addPublicList
);
userRoutes.patch("/publiclist/delete-list", isAuthenticated, deletePublicList);
userRoutes.patch(
  "/publiclist/add-anime",
  isAuthenticated,
  addAnimeValidation,
  addAnimeToPublicList
);
userRoutes.patch(
  "/publiclist/remove-anime",
  isAuthenticated,
  removeAnimeFromPublicList
);
