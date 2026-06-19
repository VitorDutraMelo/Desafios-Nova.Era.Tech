import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { productSchema } from "../schemas/product.schema";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "SELLER"]),
  validate(productSchema),
  productController.create
);

productRoutes.get("/", productController.findAll);
productRoutes.get("/:id", productController.findById);

productRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN", "SELLER"]),
  validate(productSchema),
  productController.update
);

productRoutes.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN", "SELLER"]),
  productController.delete
);

export { productRoutes };