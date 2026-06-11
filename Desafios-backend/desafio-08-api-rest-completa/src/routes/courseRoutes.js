const router = require("express").Router();

const courseController = require("../controllers/courseController");
const validate = require("../middlewares/validate");

const { courseSchema } = require("../schemas/courseSchema");

const {
  authMiddleware,
  adminOnly,
} = require("../middlewares/authMiddleware");

router.get("/", courseController.listCourses);
router.get("/:id", courseController.getCourseById);

router.post(
  "/",
  authMiddleware,
  adminOnly,
  validate(courseSchema),
  courseController.createCourse
);

router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  validate(courseSchema),
  courseController.updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  courseController.deleteCourse
);

module.exports = router;