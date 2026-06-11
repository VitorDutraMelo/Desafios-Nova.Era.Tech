const { z } = require("zod");

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(3),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  price: z.number().positive(),
});

module.exports = {
  courseSchema,
};