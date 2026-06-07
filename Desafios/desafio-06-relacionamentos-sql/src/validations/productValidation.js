const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  price: z.number().positive("Price must be greater than zero"),
  stock: z.number().int().min(0, "Stock cannot be negative")
});

module.exports = {
  createProductSchema
};