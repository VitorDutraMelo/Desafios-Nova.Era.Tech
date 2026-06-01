const pool = require("../config/database");

async function create(product) {
  const [result] = await pool.query(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [product.name, product.price, product.stock]
  );

  return {
    id: result.insertId,
    ...product,
  };
}

async function findAll() {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
}

async function update(id, product) {
  await pool.query(
    "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
    [product.name, product.price, product.stock, id]
  );

  return findById(id);
}

async function remove(id) {
  await pool.query("DELETE FROM products WHERE id = ?", [id]);
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};