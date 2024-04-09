import { z } from "zod";

export const registerUserValidation = (req, res, next) => {
  const stringSchema = z.string();

  const { fullname, username, email, password } = req.body;

  if (!fullname) {
    res.status(400);
    throw new Error("fullname is required");
  }
  if (!stringSchema.safeParse(fullname).success) {
    res.status(400);
    throw new Error("fullname should be string");
  }
  if (fullname.trim().length === 0) {
    res.status(400);
    throw new Error("Fullname cannot be empty");
  }
  //
  if (!username) {
    res.status(400);
    throw new Error("username is required");
  }
  if (!stringSchema.safeParse(username).success) {
    res.status(400);
    throw new Error("username should be string");
  }
  if (username.trim().length < 3) {
    res.status(400);
    throw new Error("Username should be atleast 3 characters");
  }
  //
  if (!email) {
    res.status(400);
    throw new Error("email is required");
  }
  if (!stringSchema.email().safeParse(email).success) {
    res.status(400);
    throw new Error("Invalid email format");
  }
  //
  if (!password) {
    res.status(400);
    throw new Error("password is required");
  }
  if (!stringSchema.safeParse(password).success) {
    res.status(400);
    throw new Error("password should be string");
  }
  if (password.trim().length <= 10) {
    res.status(400);
    throw new Error("Password should be greater than 10 characters");
  }

  return next();
};
