require("dotenv").config();

const app = require("./app");
const db = require("./config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.execute("SELECT 1");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("✅ Database connected successfully");
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();