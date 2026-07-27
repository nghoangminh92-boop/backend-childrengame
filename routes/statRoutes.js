import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/stats/summary - tính real-time từ dữ liệu User thật
router.get("/summary", async (req, res) => {
  try {
    const totalStudents = await User.countDocuments();

    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          totalStars: { $sum: { $ifNull: ["$totalScore", 0] } },
          totalBadges: { $sum: { $size: { $ifNull: ["$badges", []] } } },
        },
      },
    ]);

    const totalStars = result[0]?.totalStars || 0;
    const totalBadges = result[0]?.totalBadges || 0;

    // Tổng số level cố định trong hệ thống (10 math + 10 english theo Home.jsx)
    const totalLevels = 20;

    res.json({
      totalStars,
      totalBadges,
      totalLevels,
      totalStudents,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy số liệu", error: err.message });
  }
});

export default router;