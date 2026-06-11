const courseService = require("../services/courseService");

async function createCourse(req, res, next) {
  try {
    const course = await courseService.createCourse(req.body);

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
}

async function listCourses(req, res, next) {
  try {
    const result = await courseService.listCourses(req.query);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
  try {
    const course = await courseService.getCourseById(req.params.id);

    return res.json(course);
  } catch (error) {
    next(error);
  }
}

async function updateCourse(req, res, next) {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);

    return res.json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCourse(req, res, next) {
  try {
    const result = await courseService.deleteCourse(req.params.id);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCourse,
  listCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};