import express from "express";
import Stat from "../models/Stat.js";

const router = express.Router();

// GET /api/stats/summary - dùng cho Home.jsx
router.get("/summary", async (req, res) => {
  try {
    let stat = await Stat.findOne();
    if (!stat) {
      stat = await Stat.create({});
    }
    res.json(stat);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy số liệu", error: err.message });
  }
});

// PATCH /api/stats/summary - cập nhật số liệu
router.patch("/summary", async (req, res) => {
  try {
    let stat = await Stat.findOne();
    if (!stat) {
      stat = await Stat.create(req.body);
    } else {
      Object.assign(stat, req.body);
      await stat.save();
    }
    res.json(stat);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi cập nhật số liệu", error: err.message });
  }
});

export default router;