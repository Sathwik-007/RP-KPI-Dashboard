import dotenv from "dotenv";
dotenv.config();

import express from "express";
import db from "./models/index.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

// REgistering Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Sync Database & Start Server
db.sequelize.sync({ force: true }).then(() => {
  console.log("✅ Database synced successfully.");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to sync database:", err);
});