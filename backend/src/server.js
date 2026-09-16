import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { getDb } from "./repositories/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "*", // allow local client origins
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger in dev
if (config.nodeEnv === "development") {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.url}`);
    next();
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: `${config.brand.name} Boutique API`,
    version: "1.0.0"
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/stats", statsRoutes);

// 404 Fallback
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error occurred"
  });
});

// Startup function
async function startServer() {
  try {
    // Warm up and verify DB
    await getDb();
    console.log("Database initialized successfully.");

    app.listen(config.port, () => {
      console.log(`====================================================`);
      console.log(`  ${config.brand.name} Engine Running on port ${config.port}`);
      console.log(`  Environment: ${config.nodeEnv}`);
      console.log(`  Health: http://localhost:${config.port}/api/health`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

export default app;
