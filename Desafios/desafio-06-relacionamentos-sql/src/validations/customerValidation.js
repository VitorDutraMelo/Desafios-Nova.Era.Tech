const { z } = require("zod");

const createCustomerSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional()
});

module.exports = {
  createCustomerSchema
};