import express from "express";
import Notice from "../models/Notice.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC - Home.jsx cần gọi route này kể cả khi chưa đăng nhập
router.get("/latest", async (req, res) => {
  try {
    const now = new Date();
    const notice = await Notice.findOne({
      isActive: true,
      $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
    }).sort({ publishedAt: -1 });

    res.json(notice || null);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy thông báo", error: err.message });
  }
});

// ADMIN ONLY - danh sách đầy đủ cho trang quản lý
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const notices = await Notice.find().sort({ publishedAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách thông báo", error: err.message });
  }
});

// ADMIN ONLY - tạo thông báo
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const { title, description, type, expiresAt } = req.body;
    const notice = await Notice.create({ title, description, type, expiresAt });
    res.status(201).json(notice);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi tạo thông báo", error: err.message });
  }
});

// ADMIN ONLY - sửa/ẩn
router.patch("/:id", protect, isAdmin, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!notice) return res.status(404).json({ message: "Không tìm thấy thông báo" });
    res.json(notice);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi cập nhật thông báo", error: err.message });
  }
});

// ADMIN ONLY - xóa
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Không tìm thấy thông báo" });
    res.json({ message: "Đã xóa thông báo" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa thông báo", error: err.message });
  }
});

export default router;