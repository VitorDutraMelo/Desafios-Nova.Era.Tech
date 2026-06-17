const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("GET / - Home route accessed");

  return res.status(200).json({
    message: "Advanced Docker API is running successfully",
    environment: process.env.NODE_ENV || "development",
    runningAs: "non-root user inside container",
  });
});

app.get("/health", (req, res) => {
  console.log("GET /health - Health check accessed");

  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || "development"}`);
});