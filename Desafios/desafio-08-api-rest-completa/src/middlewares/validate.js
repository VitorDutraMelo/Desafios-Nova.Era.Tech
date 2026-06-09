function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next({
        code: "VALIDATION_ERROR",
        message: "Validation error",
        statusCode: 400,
        details: error.errors,
      });
    }
  };
}

module.exports = validate;