import express from "express";

import {
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

export const userRoutes = express.Router();

userRoutes.post("/register", registerUserValidation, registerUser);
userRoutes.post("/login", loginUserValidation, loginUser);
userRoutes.put("/profile", isAuthenticated, updateUserValidation, updateUser);
userRoutes.get("/profile", isAuthenticated, userProfile);
//
userRoutes
  .route("/privatelist")
  .put(isAuthenticated, addListValidation, addPrivateList)
  .delete(isAuthenticated, deletePrivateList);

userRoutes
  .route("/publiclist")
  .put(isAuthenticated, addListValidation, addPublicList)
  .delete(isAuthenticated, deletePublicList);
