const { z } = require("zod");

const createOrderSchema = z.object({
  customer_id: z.number().int().positive("Customer ID is required"),
  items: z
    .array(
      z.object({
        product_id: z.number().int().positive("Product ID is required"),
        quantity: z.number().int().positive("Quantity must be greater than zero")
      })
    )
    .min(1, "Order must have at least one item")
});

module.exports = {
  createOrderSchema
};