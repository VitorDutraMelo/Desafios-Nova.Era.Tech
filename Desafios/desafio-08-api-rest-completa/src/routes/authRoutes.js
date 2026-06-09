const router = require("express").Router();

const authController = require("../controllers/authController");
const validate = require("../middlewares/validate");

const {
  registerSchema,
  loginSchema,
} = require("../schemas/authSchema");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;