import { z } from "zod";

export const addListValidation = (req, res, next) => {
  const { listName } = req.body;

  const stringSchema = z.string();

  if (!listName) {
    res.status(400);
    throw new Error("listname is required");
  }
  if (!stringSchema.safeParse(listName).success) {
    res.status(400);
    throw new Error("listname should be string");
  }
  if (listName.trim().length === 0) {
    res.status(400);
    throw new Error("Listname cannot be empty");
  }
  return next();
};
