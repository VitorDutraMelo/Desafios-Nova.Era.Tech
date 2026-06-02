# 🚀 Products CRUD API

A complete CRUD API built with **Node.js**, **Express**, **MySQL**, and **Zod**, developed as part of the **Nova Era Tech Backend JS Challenge #01**.

This project demonstrates a real-world backend architecture with layered organization, data validation, error handling, cloud database integration, and a frontend dashboard for product management.

---

## 📸 Project Preview

### 🖥️ Frontend Dashboard

![Frontend Dashboard](./image/front.png)

### ➕ Create Product

![Create Product](./image/post.png)

### 🔍 Get Product By ID

![Get Product](./image/get.png)

### ✏️ Update Product

![Update Product](./image/put.png)

### 🗑️ Delete Product

![Delete Product](./image/delet.png)

### ❌ Error Handling

![Error Handling](./image/erro.png)

---

## 🛠️ Technologies

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- Zod
- Dotenv
- CORS

### Database

- Aiven MySQL Cloud Database

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla JS)

---

## 📂 Project Structure

```txt
crud-mysql-desafio01/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── productController.js
│   │
│   ├── repositories/
│   │   └── productRepository.js
│   │
│   ├── routes/
│   │   └── productRoutes.js
│   │
│   ├── schemas/
│   │   └── productSchema.js
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   └── server.js
│
├── sql/
│   └── create-products-table.sql
│
├── image/
│   ├── front.png
│   ├── post.png
│   ├── get.png
│   ├── put.png
│   ├── delet.png
│   └── erro.png
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=3000

DB_HOST=your-host
DB_PORT=your-port
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-database
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/crud-mysql-desafio01.git
```

Navigate to the project:

```bash
cd crud-mysql-desafio01
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run dev
```

---

## 🗄️ Database

Create the products table:

```sql
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📌 API Endpoints

### Create Product

```http
POST /products
```

### Get All Products

```http
GET /products
```

### Get Product By ID

```http
GET /products/:id
```

### Update Product

```http
PUT /products/:id
```

### Delete Product

```http
DELETE /products/:id
```

---

## ✅ Features

- Create products
- List products
- Search products by ID
- Update products
- Delete products
- Input validation with Zod
- Error handling
- MySQL cloud database
- Frontend dashboard
- RESTful architecture

---

## 🎯 Challenge Goals Achieved

- ✅ Node.js API
- ✅ Express Routes
- ✅ MySQL Integration
- ✅ CRUD Operations
- ✅ Layered Architecture
- ✅ Input Validation
- ✅ Environment Variables
- ✅ Error Handling
- ✅ HTTP Status Codes
- ✅ Frontend Integration

---

## 👨‍💻 Author

**Vitor Dutra Melo**

- GitHub: https://github.com/Vitor2209
- LinkedIn: https://www.linkedin.com/in/vitordutramelo

---

## 🏆 Nova Era Tech

Backend JS Formation

**Challenge 01 — CRUD with MySQL**

✔ Completed Successfully