const db = require("../config/database");

async function createCustomer(data) {
  const [result] = await db.execute(
    "INSERT INTO d06_customers (name, email, phone) VALUES (?, ?, ?)",
    [data.name, data.email, data.phone || null]
  );

  return {
    id: result.insertId,
    ...data
  };
}

async function findAllCustomers() {
  const [rows] = await db.execute(
    "SELECT * FROM d06_customers ORDER BY id DESC"
  );

  return rows;
}

async function findCustomerById(id) {
  const [rows] = await db.execute(
    "SELECT * FROM d06_customers WHERE id = ?",
    [id]
  );

  return rows[0];
}

async function findCustomerByEmail(email) {
  const [rows] = await db.execute(
    "SELECT * FROM d06_customers WHERE email = ?",
    [email]
  );

  return rows[0];
}

module.exports = {
  createCustomer,
  findAllCustomers,
  findCustomerById,
  findCustomerByEmail
};