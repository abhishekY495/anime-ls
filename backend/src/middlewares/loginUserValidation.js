import { z } from "zod";

export const loginUserValidation = (req, res, next) => {
  const { username, password } = req.body;

  const stringSchema = z.string();

  if (!username) {
    res.status(400);
    throw new Error("username is required");
  }
  if (!stringSchema.safeParse(username).success) {
    res.status(400);
    throw new Error("username should be string");
  }
  if (username.trim().length === 0) {
    res.status(400);
    throw new Error("Username cannot be empty");
  }
  if (!password) {
    res.status(400);
    throw new Error("password is required");
  }
  if (!stringSchema.safeParse(password).success) {
    res.status(400);
    throw new Error("password should be string");
  }
  return next();
};
