# 🚀 Challenge 14 — Microservices Architecture

A backend project built with **Node.js**, **Express**, **Docker Compose**, and **HTTP communication between services**.

This project was developed as part of the **Nova Era Tech Backend JavaScript Formation**, focusing on the practical fundamentals of microservices architecture, service separation, communication, fault tolerance, and basic observability.

---

## 📌 Project Overview

The goal of this challenge is to decompose an application into independent backend services.

Instead of building a single monolithic API, this project contains multiple services with different responsibilities:

* **user-service** — responsible for user data
* **catalog-service** — responsible for catalog/product data
* **gateway-api** — responsible for composing data from multiple services

The gateway communicates with the internal services through HTTP and returns an aggregated response.

---

## 🧠 What I Practiced

* Basic microservices architecture
* Service responsibility separation
* HTTP communication between backend services
* Docker Compose orchestration
* Environment variables per service
* Timeout between services
* Failure handling between services
* Basic service logs
* Aggregated API response

---

## 🏗️ Architecture

```txt
Client
  |
  v
gateway-api
  |
  |----> user-service
  |
  |----> catalog-service
```

---

## 📁 Project Structure

```txt
desafio-14-microservices-architecture/
├── docker-compose.yml
├── README.md
├── user-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── server.js
├── catalog-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── server.js
└── gateway-api/
    ├── Dockerfile
    ├── package.json
    └── src/
        └── server.js
```

---

## ⚙️ Services

### User Service

Responsible for user data.

Default port:

```txt
3001
```

Example endpoint:

```http
GET /users/1
```

---

### Catalog Service

Responsible for catalog data.

Default port:

```txt
3002
```

Example endpoint:

```http
GET /catalog
```

---

### Gateway API

Responsible for communicating with the other services and returning an aggregated response.

Default port:

```txt
3000
```

Example endpoint:

```http
GET /summary/1
```

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/desafio-14-microservices-architecture.git
```

### 2. Access the project folder

```bash
cd desafio-14-microservices-architecture
```

### 3. Start all services with Docker Compose

```bash
docker compose up --build
```

---

## 🧪 How to Test

### Gateway aggregated endpoint

```http
GET http://localhost:3000/summary/1
```

Expected response:

```json
{
  "message": "Aggregated response from multiple services",
  "userService": {
    "available": true,
    "data": {
      "id": 1,
      "name": "Vitor Dutra Melo",
      "email": "vitor@example.com",
      "role": "student"
    },
    "error": null
  },
  "catalogService": {
    "available": true,
    "data": [
      {
        "id": 1,
        "name": "Node.js Backend Course",
        "price": 99.9,
        "category": "backend"
      }
    ],
    "error": null
  }
}
```

---

## 🩺 Health Check Endpoints

```http
GET http://localhost:3000/health
GET http://localhost:3001/health
GET http://localhost:3002/health
```

---

## 🔥 Failure Handling Test

To simulate a service failure, stop the catalog service:

```bash
docker stop catalog-service
```

Then call the gateway again:

```http
GET http://localhost:3000/summary/1
```

The gateway will continue working and return a controlled error for the unavailable service.

Example:

```json
{
  "catalogService": {
    "available": false,
    "data": [],
    "error": "Service unavailable"
  }
}
```

This proves that the failure of one service does not crash the whole system.

---

## 🧾 Logs

Each service logs messages using its service name.

Example:

```txt
[gateway-api] Aggregating data for user 1
[user-service] Searching user with id 1
[catalog-service] Catalog list requested
```

---

## 🛠️ Technologies

* Node.js
* Express.js
* Axios
* Docker
* Docker Compose
* JavaScript

---

## ✅ Acceptance Criteria

* Independent backend services created
* Services communicate through HTTP
* Gateway composes data from multiple services
* Timeout configured for service calls
* Failures are handled without crashing the system
* Environment variables configured per service
* Logs include service identification
* Architecture documented with a simple diagram

---

## 📚 What I Learned

With this project, I practiced how to split a backend application into multiple independent services.

I also learned how a gateway can communicate with other services, aggregate responses, and handle failures when one service becomes unavailable.

This challenge helped me understand the first practical concepts behind microservices architecture.

---

## 👨‍💻 Author

Developed by **Vitor Dutra Melo** as part of the **Nova Era Tech Backend JavaScript Formation**.
