const orderService = require("../services/orderService");
const { createOrderSchema } = require("../validations/orderValidation");

async function createOrder(req, res, next) {
  try {
    const data = createOrderSchema.parse(req.body);
    const order = await orderService.createOrder(data);

    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

async function findOrders(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const orders = await orderService.findOrders(page, limit);

    return res.status(200).json({
      page,
      limit,
      data: orders
    });
  } catch (error) {
    next(error);
  }
}

async function findOrderById(req, res, next) {
  try {
    const order = await orderService.findOrderById(Number(req.params.id));

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

async function cancelOrder(req, res, next) {
  try {
    const order = await orderService.cancelOrder(Number(req.params.id));

    return res.status(200).json({
      message: "Order cancelled successfully",
      order
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  findOrders,
  findOrderById,
  cancelOrder
};