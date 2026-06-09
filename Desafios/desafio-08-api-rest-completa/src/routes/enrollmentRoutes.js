const router = require("express").Router();

const enrollmentController = require("../controllers/enrollmentController");
const validate = require("../middlewares/validate");

const { enrollmentSchema } = require("../schemas/enrollmentSchema");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware,
  validate(enrollmentSchema),
  enrollmentController.enrollUser
);

router.get(
  "/my-courses",
  authMiddleware,
  enrollmentController.listMyCourses
);

module.exports = router;