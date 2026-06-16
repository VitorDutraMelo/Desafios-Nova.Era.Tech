const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const meRoutes = require("./routes/me.routes");
const protectedRoutes = require("./routes/protected.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.status(200).json({
    message: "Authentication API is running"
  });
});

app.use("/auth", authRoutes);
app.use("/me", meRoutes);
app.use("/protected", protectedRoutes);

app.use(errorMiddleware);

module.exports = app;