const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

async function enrollUser(userId, courseId) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new AppError("COURSE_NOT_FOUND", "Course not found", 404);
  }

  const alreadyEnrolled = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (alreadyEnrolled) {
    throw new AppError(
      "ALREADY_ENROLLED",
      "User already enrolled in this course",
      409
    );
  }

  return prisma.enrollment.create({
    data: {
      userId,
      courseId,
    },
    include: {
      course: true,
    },
  });
}

async function listMyCourses(userId) {
  return prisma.enrollment.findMany({
    where: {
      userId,
    },
    include: {
      course: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

module.exports = {
  enrollUser,
  listMyCourses,
};