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
  updateUser,
  userProfile,
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
//
userRoutes.put(
  "/privatelist",
  isAuthenticated,
  addListValidation,
  addPrivateList
);
userRoutes.patch("/privatelist", isAuthenticated, deletePrivateList);
userRoutes.patch(
  "/privatelist/addanime",
  isAuthenticated,
  addAnimeValidation,
  addAnimeToPrivateList
);

userRoutes.put(
  "/publiclist",
  isAuthenticated,
  addListValidation,
  addPublicList
);
userRoutes.patch("/publiclist", isAuthenticated, deletePublicList);
userRoutes.patch(
  "/publiclist/addanime",
  isAuthenticated,
  addAnimeValidation,
  addAnimeToPublicList
);
