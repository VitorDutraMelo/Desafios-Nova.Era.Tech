function errorMiddleware(error, request, response, next) {
  console.error(error);

  if (error.name === "ZodError") {
    return response.status(400).json({
      message: "Validation error",
      errors: error.errors
    });
  }

  return response.status(error.statusCode || 500).json({
    message: error.message || "Internal server error"
  });
}

module.exports = errorMiddleware;