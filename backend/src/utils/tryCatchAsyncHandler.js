export const tryCatchAsyncHandler = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
