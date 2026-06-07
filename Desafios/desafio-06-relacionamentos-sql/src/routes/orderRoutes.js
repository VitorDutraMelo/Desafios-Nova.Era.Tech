const { Router } = require("express");
const orderController = require("../controllers/orderController");

const router = Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.findOrders);
router.get("/:id", orderController.findOrderById);
router.patch("/:id/cancel", orderController.cancelOrder);

module.exports = router;