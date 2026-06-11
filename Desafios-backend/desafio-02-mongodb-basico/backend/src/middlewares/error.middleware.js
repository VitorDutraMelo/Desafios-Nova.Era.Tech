const { ZodError } = require("zod");
const mongoose = require("mongoose");

function errorMiddleware(error, req, res, next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.issues,
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  return res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
}

module.exports = {
  errorMiddleware,
};