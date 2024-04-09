export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || "Something went wrong",
    stack: process.env.NODE_ENV === "DEV" ? error.stack : null,
  });
};
