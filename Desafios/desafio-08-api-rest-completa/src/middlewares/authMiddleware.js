const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("TOKEN_MISSING", "Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("TOKEN_INVALID", "Token is invalid", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch {
    throw new AppError("TOKEN_INVALID", "Token is invalid", 401);
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== "ADMIN") {
    throw new AppError(
      "FORBIDDEN",
      "You do not have permission to access this resource",
      403
    );
  }

  next();
}

module.exports = {
  authMiddleware,
  adminOnly,
};