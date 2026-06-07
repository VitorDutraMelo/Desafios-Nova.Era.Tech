const { ZodError } = require("zod");

function errorHandler(error, req, res, next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.issues
    });
  }

  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error"
  });
}

module.exports = errorHandler;