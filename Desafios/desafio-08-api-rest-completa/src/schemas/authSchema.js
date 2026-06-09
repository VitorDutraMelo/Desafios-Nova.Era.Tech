const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
  role: z.enum(["STUDENT", "ADMIN"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

module.exports = {
  registerSchema,
  loginSchema,
};