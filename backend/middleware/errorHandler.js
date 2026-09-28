export const notFoundHandler = (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) console.error("Unhandled request error:", error);

  return res.status(status).json({
    success: false,
    message: status >= 500 ? "Internal server error" : error.message,
  });
};