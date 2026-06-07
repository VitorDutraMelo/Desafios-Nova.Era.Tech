const db = require("../config/database");

async function createOrder(customerId, items) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.execute(
      "INSERT INTO d06_orders (customer_id) VALUES (?)",
      [customerId]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.execute(
        `INSERT INTO d06_order_items 
        (order_id, product_id, quantity, unit_price) 
        VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.unit_price]
      );

      await connection.execute(
        "UPDATE d06_products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function findOrders(page, limit) {
  const offset = (page - 1) * limit;

  const [rows] = await db.execute(
    `SELECT 
      o.id,
      o.status,
      o.created_at,
      c.id AS customer_id,
      c.name AS customer_name,
      c.email AS customer_email,
      COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total
    FROM d06_orders o
    INNER JOIN d06_customers c ON c.id = o.customer_id
    LEFT JOIN d06_order_items oi ON oi.order_id = o.id
    GROUP BY o.id, o.status, o.created_at, c.id, c.name, c.email
    ORDER BY o.id DESC
    LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return rows;
}

async function findOrderById(id) {
  const [orderRows] = await db.execute(
    `SELECT 
      o.id,
      o.status,
      o.created_at,
      c.id AS customer_id,
      c.name AS customer_name,
      c.email AS customer_email,
      COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total
    FROM d06_orders o
    INNER JOIN d06_customers c ON c.id = o.customer_id
    LEFT JOIN d06_order_items oi ON oi.order_id = o.id
    WHERE o.id = ?
    GROUP BY o.id, o.status, o.created_at, c.id, c.name, c.email`,
    [id]
  );

  const order = orderRows[0];

  if (!order) {
    return null;
  }

  const [items] = await db.execute(
    `SELECT 
      oi.id,
      oi.product_id,
      p.name AS product_name,
      oi.quantity,
      oi.unit_price,
      (oi.quantity * oi.unit_price) AS subtotal
    FROM d06_order_items oi
    INNER JOIN d06_products p ON p.id = oi.product_id
    WHERE oi.order_id = ?`,
    [id]
  );

  return {
    id: order.id,
    status: order.status,
    created_at: order.created_at,
    customer: {
      id: order.customer_id,
      name: order.customer_name,
      email: order.customer_email
    },
    total: Number(order.total),
    items
  };
}

async function cancelOrder(id) {
  const [result] = await db.execute(
    "UPDATE d06_orders SET status = 'cancelled' WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}

module.exports = {
  createOrder,
  findOrders,
  findOrderById,
  cancelOrder
};