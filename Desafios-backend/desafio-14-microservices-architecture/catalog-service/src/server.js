const express = require("express");

const app = express();

const PORT = process.env.PORT || 3002;
const SERVICE_NAME = process.env.SERVICE_NAME || "catalog-service";

app.use(express.json());

function log(message) {
  console.log(`[${SERVICE_NAME}] ${message}`);
}

const catalog = [
  {
    id: 1,
    name: "Node.js Backend Course",
    price: 99.9,
    category: "backend"
  },
  {
    id: 2,
    name: "Docker for Developers",
    price: 79.9,
    category: "devops"
  },
  {
    id: 3,
    name: "Microservices Architecture",
    price: 129.9,
    category: "architecture"
  }
];

app.get("/health", (req, res) => {
  log("Health check requested");

  return res.json({
    service: SERVICE_NAME,
    status: "ok"
  });
});

app.get("/catalog", (req, res) => {
  log("Catalog list requested");

  return res.json(catalog);
});

app.listen(PORT, () => {
  log(`Running on port ${PORT}`);
});