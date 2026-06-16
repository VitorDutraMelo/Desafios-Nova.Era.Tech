const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

async function authMiddleware(request, response, next) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: "Authentication token is required"
      });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return response.status(401).json({
        message: "Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return response.status(401).json({
        message: "Invalid authentication token"
      });
    }

    request.user = user;

    next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = authMiddleware;