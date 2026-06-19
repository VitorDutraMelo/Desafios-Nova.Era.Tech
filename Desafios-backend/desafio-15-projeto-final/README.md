# 🚀 OrderFlow API — Final Backend Project

A complete backend application built with **Node.js**, **TypeScript**, **Express**, **Prisma**, **PostgreSQL**, **JWT Authentication**, **Docker**, and **Jest**.

This project was developed as the final challenge of the **Nova Era Tech Backend JavaScript Formation**, consolidating the main backend concepts learned during the program.

---

## 📌 Overview

**OrderFlow API** is a marketplace/order management backend system where users can register, authenticate, manage products, organize categories, and create orders through a complete checkout flow.

The project focuses on real-world backend practices such as:

- Clean architecture by layers
- SQL database persistence
- Authentication and authorization
- Input validation
- Centralized error handling
- Business rules
- Database migrations
- Docker environment
- Automated tests

---

## 🧠 Main Features

- User registration and login
- JWT authentication
- Role-based authorization
- Product CRUD
- Category CRUD
- Order checkout flow
- Stock validation
- Order total calculation
- Payment record creation
- Centralized error handling
- Zod validation
- Prisma migrations
- Docker and Docker Compose
- Unit tests with Jest

---

## 🛠️ Technologies

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Neon Database
- JWT
- bcrypt
- Zod
- Jest
- Docker
- Docker Compose

---

## 🏗️ Architecture

The project follows a layered architecture:

```txt
Routes → Controllers → Services → Prisma Database

Layers
Routes: define API endpoints
Controllers: handle request and response
Services: contain business rules
Schemas: validate request data
Middlewares: handle authentication, authorization, validation and errors
Prisma: manages database access and migrations
📦 Main Entities
User

Represents system users.

Roles:

ADMIN
SELLER
CUSTOMER
Category

Represents product categories.

Product

Represents items available for purchase.

Order

Represents a customer purchase.

OrderItem

Represents products inside an order.

Payment

Represents the payment status of an order.

🔐 Authentication

Authentication is handled using JWT.

Protected routes require:

Authorization: Bearer your_token_here
🔑 User Roles
Role	Permissions
ADMIN	Full access
SELLER	Manage products
CUSTOMER	Create orders
🔄 Business Flow: Checkout

The checkout flow is the main business rule of the application.

Steps
Customer sends selected products and quantities
API validates if products exist
API checks available stock
API calculates the total order price
API creates the order
API creates order items
API creates a pending payment
API updates product stock
🚀 Running the Project
1. Clone the repository
git clone https://github.com/your-username/desafio-15-projeto-final.git
2. Enter the project folder
cd desafio-15-projeto-final
3. Install dependencies
npm install
4. Configure environment variables

Create a .env file based on .env.example.

DATABASE_URL="your_postgresql_url"
JWT_SECRET="your_jwt_secret"
PORT=3000
5. Run Prisma migrations
npx prisma migrate dev
6. Run seed
npm run seed
7. Start development server
npm run dev
🐳 Running with Docker
docker compose up --build

The API will be available at:

http://localhost:3000

📚 API Routes

Auth
Method	Route	Description
POST	/auth/register	Register user
POST	/auth/login	Login user
GET	/auth/me	Get authenticated user
Categories
Method	Route	Description
POST	/categories	Create category
GET	/categories	List categories
PUT	/categories/:id	Update category
DELETE	/categories/:id	Delete category
Products
Method	Route	Description
POST	/products	Create product
GET	/products	List products
GET	/products/:id	Get product by ID
PUT	/products/:id	Update product
DELETE	/products/:id	Delete product
Orders
Method	Route	Description
POST	/orders/checkout	Create order checkout
GET	/orders	List user orders
GET	/orders/:id	Get order details
PATCH	/orders/:id/status	Update order status

🧪 Running Tests
npm test

Run coverage:

npm run test:coverage
🌱 Seed Data

The seed script creates initial data such as:

Admin user
Seller user
Customer user
Categories
Products

🧾 Technical Decisions

Why Express?

Express was chosen because it is lightweight, flexible and widely used in real-world backend applications.

Why Prisma?

Prisma provides type-safe database access, migrations and a clean developer experience.

Why PostgreSQL?

PostgreSQL is a powerful relational database widely used in production systems.

Why Zod?

Zod was used to validate request data before reaching the business layer.

Why JWT?

JWT allows stateless authentication and works well for REST APIs.

✅ Acceptance Criteria

API runs locally
Main endpoints work end-to-end
Authentication and authorization implemented
SQL persistence with Prisma
Docker environment available
Critical business rules tested
README with clear documentation

📈 Future Improvements

Swagger documentation
Cloud deployment
Payment gateway integration
Product images
Admin dashboard
Structured logs
Metrics
Rate limiting
Refresh token system

👨‍💻 Author

Developed by Vitor Dutra Melo.

Backend Developer focused on building real-world APIs with Node.js, TypeScript, SQL databases, authentication, testing and Docker.


---