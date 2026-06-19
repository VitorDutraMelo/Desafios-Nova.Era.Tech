import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register", validate(registerSchema), authController.register);
authRoutes.post("/login", validate(loginSchema), authController.login);
authRoutes.get("/me", authMiddleware, authController.me);

export { authRoutes };