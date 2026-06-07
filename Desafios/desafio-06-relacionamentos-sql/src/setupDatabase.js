require("dotenv").config();

const db = require("./config/database");

async function setupDatabase() {
  try {
    console.log("⏳ Creating database tables...");

    await db.execute(`
      CREATE TABLE IF NOT EXISTS d06_customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        phone VARCHAR(30),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS d06_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS d06_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_d06_orders_customer
          FOREIGN KEY (customer_id)
          REFERENCES d06_customers(id)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS d06_order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,

        CONSTRAINT fk_d06_order_items_order
          FOREIGN KEY (order_id)
          REFERENCES d06_orders(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,

        CONSTRAINT fk_d06_order_items_product
          FOREIGN KEY (product_id)
          REFERENCES d06_products(id)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      )
    `);

    await db.execute(`
      INSERT INTO d06_products (name, price, stock)
      SELECT * FROM (
        SELECT 'Mouse Gamer' AS name, 150.00 AS price, 20 AS stock
        UNION ALL
        SELECT 'Teclado Mecânico', 300.00, 15
        UNION ALL
        SELECT 'Monitor 24 Polegadas', 900.00, 10
        UNION ALL
        SELECT 'Headset Gamer', 250.00, 12
      ) AS tmp
      WHERE NOT EXISTS (
        SELECT 1 FROM d06_products LIMIT 1
      )
    `);

    console.log("✅ Database tables created successfully!");
    console.log("✅ Seed products inserted successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating database:", error.message);
    process.exit(1);
  }
}

setupDatabase();