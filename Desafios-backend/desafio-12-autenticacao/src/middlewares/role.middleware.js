function roleMiddleware(allowedRoles) {
  return function (request, response, next) {
    if (!request.user) {
      return response.status(401).json({
        message: "User not authenticated"
      });
    }

    if (!allowedRoles.includes(request.user.role)) {
      return response.status(403).json({
        message: "You do not have permission to access this resource"
      });
    }

    next();
  };
}

module.exports = roleMiddleware;