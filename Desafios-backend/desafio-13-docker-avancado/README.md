# 🚀 Challenge 13 — Advanced Docker

A production-focused backend API built with **Node.js**, **Express**, and **Docker**, created to practice advanced containerization concepts such as multi-stage builds, optimized production images, cache strategy, non-root users, and container logs.

This project is part of the **Nova Era Tech Backend Challenges**.

---

## 🎯 Challenge Goal

The goal of this challenge is to improve the Docker maturity of a backend API, preparing it for a production-like environment.

The project focuses on:

- Docker multi-stage build
- Smaller final image
- Production-only dependencies
- Non-root user execution
- Cache optimization
- Container logging strategy
- Reproducible build and run commands

---

## 🧠 Technologies Practiced

- Node.js
- Express.js
- Docker
- Multi-stage Docker builds
- Alpine Linux image
- Production environment configuration
- Container security basics

---

## 📦 Project Structure

```txt
desafio-13-docker-avancado/
│
├── src/
│   └── server.js
│
├── .dockerignore
├── .env.example
├── Dockerfile
├── package.json
└── README.md
🚀 API Endpoints
Home
GET /

Response example:

{
  "message": "Advanced Docker API is running successfully",
  "environment": "production",
  "runningAs": "non-root user inside container"
}
Health Check
GET /health

Response example:

{
  "status": "ok",
  "uptime": 10.45,
  "timestamp": "2026-06-16T18:00:00.000Z"
}
🐳 Dockerfile Overview

This project uses a multi-stage Dockerfile.

Stage 1 — Dependencies

The first stage installs all dependencies using:

RUN npm ci

This helps Docker use cache more efficiently.

Stage 2 — Production

The final stage installs only production dependencies:

RUN npm ci --omit=dev && npm cache clean --force

It also defines:

ENV NODE_ENV=production

And runs the application with a non-root user:

USER appuser
🔒 Security Practices

This Docker setup follows basic container security practices:

Uses a small Alpine-based image
Avoids development dependencies in the final image
Runs the application as a non-root user
Uses .dockerignore to avoid copying unnecessary files
Keeps environment configured as production
⚙️ Running Locally Without Docker
npm install
npm run dev

The server will run on:

http://localhost:3000
🐳 Build Docker Image
docker build -t desafio-13-docker-avancado .
▶️ Run Docker Container
docker run --rm -p 3000:3000 desafio-13-docker-avancado

Access:

http://localhost:3000

Health check:

http://localhost:3000/health
📏 Check Docker Image Size
docker images

This command shows the final image size.

The final image is optimized because it:

Uses node:22-alpine
Installs only production dependencies
Removes npm cache
Ignores unnecessary files with .dockerignore
🧪 Check Container User

To confirm the container is not running as root:

docker run --rm desafio-13-docker-avancado whoami

Expected result:

appuser
📜 Container Logs

The application uses console.log, which is the recommended basic logging strategy for containers.

Docker automatically captures stdout and stderr logs.

Example:

docker run --rm -p 3000:3000 desafio-13-docker-avancado

When the API receives requests, logs appear in the terminal.

✅ Acceptance Criteria
 Dockerfile with multi-stage build
 Separate dependency and runtime stages
 Smaller production image
 No development dependencies in final image
 NODE_ENV=production
 Application runs in final Docker stage
 Application runs with non-root user
 Container logs configured through stdout
 Build and run commands documented
⭐ Optional Improvements

Future improvements may include:

Image vulnerability scan with Docker Scout or Trivy
GitHub Actions pipeline
Automatic publish to Docker Hub or GitHub Container Registry
Production monitoring
Docker Compose integration in the next challenge

👨‍💻 Author

Developed by Vitor Dutra Melo as part of the Nova Era Tech Backend JavaScript Formation.