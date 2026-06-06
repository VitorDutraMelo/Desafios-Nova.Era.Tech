const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "🚀 API running successfully inside Docker!",
    challenge: "Desafio 04 - Docker Básico",
    status: "success"
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/users", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Vitor Dutra",
      role: "Backend Developer"
    },
    {
      id: 2,
      name: "Nova Era Tech",
      role: "Challenge Platform"
    }
  ]);
});

module.exports = app;