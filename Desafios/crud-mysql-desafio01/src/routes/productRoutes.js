const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/products", productController.create);
router.get("/products", productController.findAll);
router.get("/products/:id", productController.findById);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.remove);

module.exports = router;