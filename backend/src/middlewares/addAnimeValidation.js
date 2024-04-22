import { z } from "zod";

export const addAnimeValidation = (req, res, next) => {
  const { listId, animeData } = req.body;

  const animeObjectSchema = z.object({
    title: z.string(),
    coverImage: z.string().url(),
    link: z.string().url(),
  });
  const listIdSchema = z.string();

  if (!animeData) {
    res.status(400);
    throw new Error("animeData is required");
  }
  if (!listId) {
    res.status(400);
    throw new Error("listId is required");
  }

  if (!listIdSchema.safeParse(listId).success) {
    res.status(400);
    throw new Error("listId should be string");
  }

  try {
    const result = animeObjectSchema.parse(animeData);
    req.animeData = result;
    req.listId = listId;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      res.status(400).json({
        message: "Invalid data provided",
        errors: errorMessages,
      });
    } else {
      res.status(500).send("An unexpected error occurred");
    }
  }
};
