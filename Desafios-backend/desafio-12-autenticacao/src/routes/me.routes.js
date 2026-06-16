const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getMe } = require("../controllers/me.controller");

const meRoutes = Router();

meRoutes.get("/", authMiddleware, getMe);

module.exports = meRoutes;