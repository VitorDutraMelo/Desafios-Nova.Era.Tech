const db = require("../config/database");

async function createProduct(data) {
  const [result] = await db.execute(
    "INSERT INTO d06_products (name, price, stock) VALUES (?, ?, ?)",
    [data.name, data.price, data.stock]
  );

  return {
    id: result.insertId,
    ...data
  };
}

async function findAllProducts() {
  const [rows] = await db.execute(
    "SELECT * FROM d06_products ORDER BY id DESC"
  );

  return rows;
}

async function findProductById(id) {
  const [rows] = await db.execute(
    "SELECT * FROM d06_products WHERE id = ?",
    [id]
  );

  return rows[0];
}

module.exports = {
  createProduct,
  findAllProducts,
  findProductById
};