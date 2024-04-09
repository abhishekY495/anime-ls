import jwt from "jsonwebtoken";

import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler.js";
import { User } from "../models/userModel.js";

export const isAuthenticated = tryCatchAsyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(400);
    throw new Error("No Token");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId).select("-password");
    if (user === null) {
      res.status(400);
      throw new Error("Invalid Token");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Token");
  }
});
