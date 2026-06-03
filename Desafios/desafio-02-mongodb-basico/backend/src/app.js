const path = require("path");
const express = require("express");

const taskRoutes = require("./routes/task.routes");
const { errorMiddleware } = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "..", "..", "public")
  )
);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "public",
      "index.html"
    )
  );
});

app.get("/api", (req, res) => {
  return res.json({
    message: "MongoDB Challenge API Running 🚀",
  });
});

app.use("/tasks", taskRoutes);

app.use(errorMiddleware);

module.exports = app;