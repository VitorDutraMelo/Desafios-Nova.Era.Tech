const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Social Network API is running"
  });
});

app.use(userRoutes);
app.use(postRoutes);

app.use(errorHandler);

module.exports = app;