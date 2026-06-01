# 🚀 Products CRUD API

A RESTful API developed with **Node.js**, **Express**, **MySQL**, and **Zod** for managing products.

This project was created as part of the **Backend JS Formation Challenge**, focusing on API development, database persistence, validation, and clean architecture.

---

# 📋 Features

* Create products
* List all products
* Get product by ID
* Update products
* Delete products
* Data validation with Zod
* MySQL persistence
* Environment variables support
* Layered architecture

---

# 🛠 Technologies

* Node.js
* Express.js
* MySQL
* Zod
* Dotenv
* Nodemon

---

# 📁 Project Structure

```text
src/
├── config/
│   └── database.js
├── controllers/
│   └── productController.js
├── repositories/
│   └── productRepository.js
├── routes/
│   └── productRoutes.js
├── schemas/
│   └── productSchema.js
├── services/
│   └── productService.js
└── server.js

sql/
└── init.sql
```

# ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd products-crud-api
```

Install dependencies:

```bash
npm install
```

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=products_db
```

# 🗄 Database Setup

Execute the SQL script:

```sql
CREATE DATABASE IF NOT EXISTS products_db;

USE products_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

# ▶ Running the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

# 📌 API Endpoints

## Create Product

POST `/products`

Request Body:

```json
{
  "name": "Notebook Dell",
  "price": 3500.99,
  "stock": 10
}
```

---

## Get All Products

GET `/products`

---

## Get Product By ID

GET `/products/:id`

Example:

```http
GET /products/1
```

---

## Update Product

PUT `/products/:id`

Request Body:

```json
{
  "name": "Notebook Dell Updated",
  "price": 4000,
  "stock": 5
}
```

---

## Delete Product

DELETE `/products/:id`

Example:

```http
DELETE /products/1
```

# ✅ Validation Rules

| Field | Rule                                          |
| ----- | --------------------------------------------- |
| name  | Required                                      |
| price | Must be greater than 0                        |
| stock | Must be an integer greater than or equal to 0 |

# 📚 Learning Objectives

This project demonstrates:

* REST API development
* CRUD operations
* SQL database integration
* Data validation
* Layered architecture
* Error handling
* Environment configuration

# 👨‍💻 Author

Vitor Dutra Melo

Backend Developer | Node.js | Express | PostgreSQL | MySQL
