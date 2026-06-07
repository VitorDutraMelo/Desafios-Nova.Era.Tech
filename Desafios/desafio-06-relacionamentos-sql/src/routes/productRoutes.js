const { Router } = require("express");
const productController = require("../controllers/productController");

const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.findAllProducts);
router.get("/:id", productController.findProductById);

module.exports = router;