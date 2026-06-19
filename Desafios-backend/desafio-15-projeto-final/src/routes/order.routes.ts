import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { checkoutSchema } from "../schemas/order.schema";
import { z } from "zod";

const orderRoutes = Router();
const orderController = new OrderController();

const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "CANCELLED"])
});

orderRoutes.post(
  "/checkout",
  authMiddleware,
  roleMiddleware(["CUSTOMER", "ADMIN"]),
  validate(checkoutSchema),
  orderController.checkout
);

orderRoutes.get("/", authMiddleware, orderController.findAll);
orderRoutes.get("/:id", authMiddleware, orderController.findById);

orderRoutes.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validate(updateStatusSchema),
  orderController.updateStatus
);

export { orderRoutes };