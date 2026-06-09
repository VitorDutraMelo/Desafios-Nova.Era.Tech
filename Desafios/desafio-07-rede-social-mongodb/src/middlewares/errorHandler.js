function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);

    return res.status(400).json({
      message: "Validation error",
      errors
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Username already exists"
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }

  return res.status(500).json({
    message: "Internal server error"
  });
}

module.exports = errorHandler;