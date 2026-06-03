const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "done"]).optional(),
  tags: z.array(z.string()).optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(["pending", "in_progress", "done"]),
});

module.exports = {
  createTaskSchema,
  updateStatusSchema,
};