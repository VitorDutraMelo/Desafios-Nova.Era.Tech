const { Router } = require("express");
const customerController = require("../controllers/customerController");

const router = Router();

router.post("/", customerController.createCustomer);
router.get("/", customerController.findAllCustomers);
router.get("/:id", customerController.findCustomerById);

module.exports = router;