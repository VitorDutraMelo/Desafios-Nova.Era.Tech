const { z } = require("zod");

const enrollmentSchema = z.object({
  courseId: z.string().uuid(),
});

module.exports = {
  enrollmentSchema,
};