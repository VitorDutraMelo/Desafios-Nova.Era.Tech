const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  adminRoute,
  memberRoute
} = require("../controllers/protected.controller");

const protectedRoutes = Router();

protectedRoutes.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  adminRoute
);

protectedRoutes.get(
  "/member",
  authMiddleware,
  roleMiddleware(["ADMIN", "MEMBER"]),
  memberRoute
);

module.exports = protectedRoutes;