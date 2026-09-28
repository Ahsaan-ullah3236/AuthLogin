import express from "express";
import cors from "cors";
import helmet from "helmet";
import activityRoutes from "./routes/activityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const createApp = () => {
  const app = express();
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : ["http://localhost:5173", "http://127.0.0.1:5173"];

  app.set("trust proxy", process.env.TRUST_PROXY === "true" ? 1 : false);
  app.use(helmet());
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      maxAge: 86_400,
    }),
  );
  app.use(express.json({ limit: "16kb" }));

  app.get("/api/health", async (req, res) => {
    try {
      await pool.query("SELECT 1");
      return res.status(200).json({ success: true, status: "ok" });
    } catch (error) {
      console.error("Health check failed:", error);
      return res
        .status(503)
        .json({ success: false, status: "unavailable" });
    }
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/activities", activityRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;