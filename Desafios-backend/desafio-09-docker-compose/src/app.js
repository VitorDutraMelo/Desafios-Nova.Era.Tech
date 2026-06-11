const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Docker Compose API is running successfully 🚀",
  });
});

app.use("/products", productRoutes);

module.exports = app;