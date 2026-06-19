import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { categorySchema } from "../schemas/category.schema";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validate(categorySchema),
  categoryController.create
);

categoryRoutes.get("/", categoryController.findAll);

categoryRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validate(categorySchema),
  categoryController.update
);

categoryRoutes.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  categoryController.delete
);

export { categoryRoutes };