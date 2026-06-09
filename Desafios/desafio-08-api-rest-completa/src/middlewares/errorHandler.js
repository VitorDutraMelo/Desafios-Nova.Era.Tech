function errorHandler(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    code: error.code || "INTERNAL_SERVER_ERROR",
    message: error.message || "Internal server error",
    details: error.details || null,
  });
}

module.exports = errorHandler;