import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import coloringRoutes from "./routes/coloring.routes.js"; // ⭐ THÊM MỚI

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://childrengame.vercel.app",
  credentials: true,
}));

// ⭐ Tăng giới hạn body JSON — mặc định của express.json() chỉ 100kb,
// trong khi ảnh canvas tô màu (base64 PNG) thường vài trăm KB tới vài MB.
// Nếu không tăng, request lưu tranh sẽ bị lỗi "PayloadTooLargeError" (413).
app.use(express.json({ limit: "5mb" }));

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
app.use("/api/coloring", coloringRoutes); // ⭐ THÊM MỚI — phải nằm TRƯỚC middleware 404 bên dưới

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