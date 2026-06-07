const customerRepository = require("../repositories/customerRepository");

async function createCustomer(data) {
  const customerExists = await customerRepository.findCustomerByEmail(data.email);

  if (customerExists) {
    const error = new Error("Customer email already exists");
    error.statusCode = 409;
    throw error;
  }

  return customerRepository.createCustomer(data);
}

async function findAllCustomers() {
  return customerRepository.findAllCustomers();
}

async function findCustomerById(id) {
  const customer = await customerRepository.findCustomerById(id);

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  return customer;
}

module.exports = {
  createCustomer,
  findAllCustomers,
  findCustomerById
};