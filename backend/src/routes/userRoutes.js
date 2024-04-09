import express from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userProfile,
} from "../controllers/userControllers.js";
import { registerUserValidation } from "../middlewares/registerUserValidation.js";
import { loginUserValidation } from "../middlewares/loginUserValidation.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { updateUserValidation } from "../middlewares/updateUserValidation.js";

export const userRoutes = express.Router();

userRoutes.post("/register", registerUserValidation, registerUser);
userRoutes.post("/login", loginUserValidation, loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.put("/profile", isAuthenticated, updateUserValidation, updateUser);
userRoutes.get("/profile", isAuthenticated, userProfile);
