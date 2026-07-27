import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import statRoutes from "./routes/statRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "EduGame API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/stats", statRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
