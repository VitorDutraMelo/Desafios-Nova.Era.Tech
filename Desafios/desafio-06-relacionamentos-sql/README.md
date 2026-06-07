# 🚀 Challenge 06 — SQL Relationships API

A complete REST API built with **Node.js**, **Express**, **MySQL**, and **Zod**, developed as part of the **Nova Era Tech Backend Challenge**.

This project demonstrates real-world relational database modeling using:

* One-to-Many relationships
* Foreign Keys
* SQL JOINs
* Business rules validation
* Order management
* Pagination
* Data integrity

---

# 📸 Project Preview

## 🖥️ Application Running

![Application Running](./images/project-running.jpg)

---

# 🛠️ Technologies

* Node.js
* Express.js
* MySQL
* mysql2
* Zod
* Dotenv
* Nodemon
* Thunder Client

---

# 📦 Database Structure

## Customers

```sql
d06_customers
```

Stores customer information.

---

## Products

```sql
d06_products
```

Stores available products and stock quantity.

---

## Orders

```sql
d06_orders
```

Stores customer orders.

---

## Order Items

```sql
d06_order_items
```

Stores products linked to orders.

---

# 🔗 Relationships

```text
Customers (1) -------- (N) Orders

Orders (1) ----------- (N) Order Items

Products (1) --------- (N) Order Items
```

---

# 🚀 Features

### Customers

* Create customer
* List customers
* Get customer by ID

### Products

* Create product
* List products
* Get product by ID

### Orders

* Create order with multiple items
* Validate customer existence
* Validate product existence
* Validate stock availability
* Calculate order total
* List orders with pagination
* Retrieve order details
* Cancel order

---

# 📡 API Endpoints

## Customers

### Create Customer

```http
POST /customers
```

### Get Customers

```http
GET /customers
```

### Get Customer By ID

```http
GET /customers/:id
```

---

## Products

### Create Product

```http
POST /products
```

### Get Products

```http
GET /products
```

### Get Product By ID

```http
GET /products/:id
```

---

## Orders

### Create Order

```http
POST /orders
```

### Get Orders

```http
GET /orders?page=1&limit=10
```

### Get Order By ID

```http
GET /orders/:id
```

### Cancel Order

```http
PATCH /orders/:id/cancel
```

---

# ✅ Business Rules

* Customer must exist before creating an order.
* Product must exist before creating an order.
* Stock must be sufficient.
* Orders can contain multiple products.
* Order total is calculated through SQL query.
* Cancelled orders cannot be cancelled again.
* Referential integrity is enforced through foreign keys.

---

# 🧪 Example Order Request

```json
{
  "customer_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 1
    }
  ]
}
```

---

# ▶️ Running Locally

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
PORT=3000

DB_HOST=YOUR_HOST
DB_PORT=YOUR_PORT
DB_USER=YOUR_USER
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=defaultdb
```

Run database setup:

```bash
node src/setupDatabase.js
```

Start server:

```bash
npm run dev
```

---

# 📚 What I Learned

* Relational database modeling
* SQL relationships
* Foreign Keys
* JOIN queries
* Transactions
* Repository Pattern
* Service Layer
* REST API design
* Business rules validation

---

Developed by **Vitor Dutra Melo**
