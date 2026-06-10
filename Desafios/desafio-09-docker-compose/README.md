# 🚀 Docker Compose Backend Environment

A complete multi-service backend environment built with **Node.js**, **Express**, **Prisma ORM**, **MySQL**, **Docker**, and **Docker Compose**.

This project was developed as part of the **Nova Era Tech Backend Challenge #09**, focusing on container orchestration, service communication, database persistence, environment management, and backend infrastructure best practices.

---

# 📋 Overview

The purpose of this challenge is to create a fully containerized backend environment where all services can be started with a single command.

The application consists of:

* REST API built with Express.js
* MySQL Database
* Docker Compose orchestration
* Persistent storage using Docker Volumes
* Service dependency management
* Database health checks
* Environment variables configuration
* Optional Adminer database management interface

---

# 🏗️ Architecture

```text
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     API     │
│  Node.js    │
│  Express    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   MySQL DB  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ DockerVolume│
└─────────────┘
```

---

# 🚀 Technologies

### Backend

* Node.js
* Express.js
* Prisma ORM
* MySQL

### DevOps

* Docker
* Docker Compose
* Docker Volumes
* Docker Networks

### Tools

* Adminer
* Environment Variables (.env)

---

# 📁 Project Structure

```bash
desafio-09-docker-compose
│
├── prisma
│   └── schema.prisma
│
├── src
│   ├── config
│   │   └── prisma.js
│   │
│   ├── controllers
│   │   └── productController.js
│   │
│   ├── routes
│   │   └── productRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🎯 Features

✅ Containerized API

✅ MySQL Database Container

✅ Docker Compose Orchestration

✅ Docker Network Communication

✅ Persistent Database Volume

✅ Database Health Check

✅ Environment Variables

✅ CRUD Product API

✅ Automatic Service Startup Order

---

# ⚙️ Environment Variables

Create a `.env` file based on:

```env
PORT=3000

DATABASE_URL="mysql://docker_user:docker_password@db:3306/docker_compose_db"
```

---

# 🐳 Docker Compose

The environment is orchestrated using Docker Compose.

Services included:

### API

```yaml
api
```

Node.js + Express application.

### Database

```yaml
db
```

MySQL database container.

### Adminer

```yaml
adminer
```

Database management interface.

---

# ▶️ Running the Project

Build and start all services:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d
```

Stop containers:

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```

---

# 📡 API Endpoints

## Health Check

```http
GET /
```

Response:

```json
{
  "message": "Docker Compose API is running successfully 🚀"
}
```

---

## Create Product

```http
POST /products
```

Request:

```json
{
  "name": "Notebook Dell",
  "description": "Development notebook",
  "price": 3500,
  "quantity": 5
}
```

---

## Get All Products

```http
GET /products
```

---

## Get Product By ID

```http
GET /products/:id
```

---

## Update Product

```http
PUT /products/:id
```

---

## Delete Product

```http
DELETE /products/:id
```

---

# 💾 Data Persistence

Database persistence is achieved using Docker Volumes.

```yaml
volumes:
  mysql_data:
```

This ensures that data remains available even after containers are stopped or restarted.

---

# 🔍 Health Check

The database service includes a health check configuration.

```yaml
healthcheck:
  test: ["CMD", "mysqladmin", "ping"]
```

The API starts only after the database becomes healthy.

---

# 🎓 What I Learned

Through this challenge I practiced:

* Docker fundamentals
* Docker Compose orchestration
* Container networking
* Persistent volumes
* Environment variable management
* Database health checks
* Service dependency control
* Backend infrastructure setup
* Production-like development environments

---

# 🏆 Challenge Goals Achieved

* [x] Single command startup
* [x] Multi-container environment
* [x] Database persistence
* [x] Service communication
* [x] Health checks
* [x] Environment variables
* [x] Docker Compose orchestration
* [x] Backend API integration

---

# 👨‍💻 Author

**Vitor Dutra Melo**

Backend Developer focused on:

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL / MySQL
* Docker
* REST APIs

Currently building real-world backend projects through the Nova Era Tech Challenges and continuously improving software engineering skills.
