const customerRepository = require("../repositories/customerRepository");
const productRepository = require("../repositories/productRepository");
const orderRepository = require("../repositories/orderRepository");

async function createOrder(data) {
  const customer = await customerRepository.findCustomerById(data.customer_id);

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  const orderItems = [];

  for (const item of data.items) {
    const product = await productRepository.findProductById(item.product_id);

    if (!product) {
      const error = new Error(`Product with id ${item.product_id} not found`);
      error.statusCode = 404;
      throw error;
    }

    if (product.stock < item.quantity) {
      const error = new Error(`Insufficient stock for product ${product.name}`);
      error.statusCode = 400;
      throw error;
    }

    orderItems.push({
      product_id: product.id,
      quantity: item.quantity,
      unit_price: product.price
    });
  }

  const orderId = await orderRepository.createOrder(data.customer_id, orderItems);

  return orderRepository.findOrderById(orderId);
}

async function findOrders(page, limit) {
  return orderRepository.findOrders(page, limit);
}

async function findOrderById(id) {
  const order = await orderRepository.findOrderById(id);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  return order;
}

async function cancelOrder(id) {
  const order = await orderRepository.findOrderById(id);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  if (order.status === "cancelled") {
    const error = new Error("Order is already cancelled");
    error.statusCode = 400;
    throw error;
  }

  if (order.status === "completed") {
    const error = new Error("Completed orders cannot be cancelled");
    error.statusCode = 400;
    throw error;
  }

  await orderRepository.cancelOrder(id);

  return orderRepository.findOrderById(id);
}

module.exports = {
  createOrder,
  findOrders,
  findOrderById,
  cancelOrder
};