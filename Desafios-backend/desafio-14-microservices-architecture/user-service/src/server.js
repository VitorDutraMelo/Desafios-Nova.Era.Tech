const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;
const SERVICE_NAME = process.env.SERVICE_NAME || "user-service";

app.use(express.json());

function log(message) {
  console.log(`[${SERVICE_NAME}] ${message}`);
}

const users = [
  {
    id: 1,
    name: "Vitor Dutra Melo",
    email: "vitor@example.com",
    role: "student"
  },
  {
    id: 2,
    name: "Nova Era User",
    email: "novaera@example.com",
    role: "admin"
  }
];

app.get("/health", (req, res) => {
  log("Health check requested");

  return res.json({
    service: SERVICE_NAME,
    status: "ok"
  });
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  log(`Searching user with id ${userId}`);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    log(`User with id ${userId} not found`);

    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.json(user);
});

app.listen(PORT, () => {
  log(`Running on port ${PORT}`);
});