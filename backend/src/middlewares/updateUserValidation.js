import { z } from "zod";

export const updateUserValidation = (req, res, next) => {
  const stringSchema = z.string();

  const { fullname, email, password } = req.body;

  if (!(fullname || email || password)) {
    res.status(400);
    throw new Error("Provide valid data to update");
  }

  if (fullname) {
    if (!stringSchema.safeParse(fullname).success) {
      res.status(400);
      throw new Error("fullname should be string");
    }
    if (fullname.trim().length === 0) {
      res.status(400);
      throw new Error("Fullname cannot be empty");
    }
  }
  //
  if (email) {
    if (!stringSchema.email().safeParse(email).success) {
      res.status(400);
      throw new Error("Invalid email format");
    }
  }
  //
  if (password) {
    if (!stringSchema.safeParse(password).success) {
      res.status(400);
      throw new Error("password should be string");
    }
    if (password.trim().length <= 10) {
      res.status(400);
      throw new Error("Password should be greater than 10 characters");
    }
  }

  return next();
};
