import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { categoryRoutes } from "./routes/category.routes";
import { productRoutes } from "./routes/product.routes";
import { orderRoutes } from "./routes/order.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({
    message: "OrderFlow API is running 🚀"
  });
});

app.get("/health", (request, response) => {
  return response.json({
    status: "ok",
    service: "orderflow-api"
  });
});

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use(errorMiddleware);

export { app };