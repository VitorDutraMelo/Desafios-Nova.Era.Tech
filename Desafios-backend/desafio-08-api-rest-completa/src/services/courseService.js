const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

async function createCourse(data) {
  return prisma.course.create({
    data,
  });
}

async function listCourses(query) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filters = {};

  if (query.category) {
    filters.category = {
      contains: query.category,
      mode: "insensitive",
    };
  }

  if (query.level) {
    filters.level = query.level;
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where: filters,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.course.count({
      where: filters,
    }),
  ]);

  return {
    data: courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getCourseById(id) {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    throw new AppError("COURSE_NOT_FOUND", "Course not found", 404);
  }

  return course;
}

async function updateCourse(id, data) {
  await getCourseById(id);

  return prisma.course.update({
    where: { id },
    data,
  });
}

async function deleteCourse(id) {
  await getCourseById(id);

  await prisma.course.delete({
    where: { id },
  });

  return {
    message: "Course deleted successfully",
  };
}

module.exports = {
  createCourse,
  listCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};