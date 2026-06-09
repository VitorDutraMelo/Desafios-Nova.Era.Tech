const enrollmentService = require("../services/enrollmentService");

async function enrollUser(req, res, next) {
  try {
    const enrollment = await enrollmentService.enrollUser(
      req.user.id,
      req.body.courseId
    );

    return res.status(201).json({
      message: "Enrollment created successfully",
      enrollment,
    });
  } catch (error) {
    next(error);
  }
}

async function listMyCourses(req, res, next) {
  try {
    const enrollments = await enrollmentService.listMyCourses(req.user.id);

    return res.json({
      data: enrollments,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  enrollUser,
  listMyCourses,
};