const customerService = require("../services/customerService");
const { createCustomerSchema } = require("../validations/customerValidation");

async function createCustomer(req, res, next) {
  try {
    const data = createCustomerSchema.parse(req.body);
    const customer = await customerService.createCustomer(data);

    return res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
}

async function findAllCustomers(req, res, next) {
  try {
    const customers = await customerService.findAllCustomers();

    return res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
}

async function findCustomerById(req, res, next) {
  try {
    const customer = await customerService.findCustomerById(Number(req.params.id));

    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCustomer,
  findAllCustomers,
  findCustomerById
};