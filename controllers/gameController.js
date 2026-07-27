import Question from "../models/Question.js";
import Progress from "../models/Progress.js";
import User from "../models/User.js";
import { getChapterMeta } from "../data/chapters.js";

export const TOTAL_LEVELS = 10;
export const PASS_PERCENT = 0.7;

// @route GET /api/game/levels?type=math
export const getLevels = async (req, res) => {
  try {
    const { type } = req.query;
    if (!["math", "english"].includes(type)) {
      return res.status(400).json({ message: "type phải là 'math' hoặc 'english'" });
    }

    const progressList = await Progress.find({ userId: req.user._id, type });
    const progressMap = new Map(progressList.map((p) => [p.level, p]));

    const levels = [];
    for (let lvl = 1; lvl <= TOTAL_LEVELS; lvl++) {
      const prog = progressMap.get(lvl);
      const prevPassed = lvl === 1 || progressMap.get(lvl - 1)?.passed;
      const chapter = getChapterMeta(type, lvl);
      levels.push({
        level: lvl,
        title: chapter.title,
        description: chapter.description,
        icon: chapter.icon,
        status: prog?.passed ? "completed" : prevPassed ? "unlocked" : "locked",
        bestScore: prog?.score || 0,
      });
    }

    res.json({ type, levels });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/game/questions?type=math&level=1
export const getQuestions = async (req, res) => {
  try {
    const { type, level } = req.query;
    const lvl = Number(level);
    if (!["math", "english"].includes(type) || !lvl) {
      return res.status(400).json({ message: "Thiếu hoặc sai tham số type/level" });
    }

    if (lvl > 1) {
      const prevProgress = await Progress.findOne({
        userId: req.user._id,
        type,
        level: lvl - 1,
      });
      if (!prevProgress?.passed) {
        return res.status(403).json({ message: "Level này đang bị khóa 🔒" });
      }
    }

    const questions = await Question.aggregate([
      { $match: { type, level: lvl } },
      { $sample: { size: 10 } },
    ]);

    res.json({ type, level: lvl, chapter: getChapterMeta(type, lvl), questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper: tính streak dựa vào ngày chơi gần nhất
const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const calculateNewStreak = (lastPlayedAt, currentStreak) => {
  const today = startOfDay(new Date());

  if (!lastPlayedAt) {
    return 1; // Lần đầu tiên chơi
  }

  const lastDay = startOfDay(lastPlayedAt);
  const diffDays = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return currentStreak || 1; // Đã chơi hôm nay rồi, giữ nguyên streak
  }
  if (diffDays === 1) {
    return (currentStreak || 0) + 1; // Chơi liên tiếp ngày hôm sau
  }
  return 1; // Bỏ quá 1 ngày → reset về 1
};

// @route POST /api/game/submit
export const submitProgress = async (req, res) => {
  try {
    const { type, level, correctCount, totalQuestions, score } = req.body;

    if (!["math", "english"].includes(type) || !level || totalQuestions == null) {
      return res.status(400).json({ message: "Thiếu dữ liệu submit" });
    }

    const percent = correctCount / totalQuestions;
    const passed = percent >= PASS_PERCENT;

    let progress;
    try {
      const existing = await Progress.findOne({ userId: req.user._id, type, level });

      progress = await Progress.findOneAndUpdate(
        { userId: req.user._id, type, level },
        {
          $set: {
            score: Math.max(score || 0, existing?.score || 0),
            correctCount,
            totalQuestions,
            passed: passed || existing?.passed || false,
          },
          $inc: { attempts: 1 },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (dupErr) {
      if (dupErr.code === 11000) {
        const existing = await Progress.findOne({ userId: req.user._id, type, level });
        progress = await Progress.findOneAndUpdate(
          { userId: req.user._id, type, level },
          {
            $set: {
              score: Math.max(score || 0, existing?.score || 0),
              correctCount,
              totalQuestions,
              passed: passed || existing?.passed || false,
            },
            $inc: { attempts: 1 },
          },
          { new: true }
        );
      } else {
        throw dupErr;
      }
    }

    const user = await User.findById(req.user._id);
    user.totalScore += score || 0;

    // ⭐ Sửa lỗi: currentLevel là object { math, english }, không phải số
    if (passed && level >= (user.currentLevel?.[type] || 1)) {
      if (!user.currentLevel) user.currentLevel = {};
      user.currentLevel[type] = level + 1;
    }

    // ⭐ Tính lại streak dựa vào ngày chơi gần nhất
    const newStreak = calculateNewStreak(user.lastPlayedAt, user.streak);
    user.streak = newStreak;
    user.lastPlayedAt = new Date();

    // Badge khi hoàn thành level 5 và 10
    if (passed && level === 5 && !user.badges.includes("halfway-hero")) {
      user.badges.push("halfway-hero");
    }
    if (passed && level === TOTAL_LEVELS && !user.badges.includes("champion")) {
      user.badges.push("champion");
    }

    // ⭐ Badge theo streak
    if (newStreak === 7 && !user.badges.includes("streak-7")) {
      user.badges.push("streak-7");
    }
    if (newStreak === 30 && !user.badges.includes("streak-30")) {
      user.badges.push("streak-30");
    }

    await user.save();

    res.json({
      passed,
      percent: Math.round(percent * 100),
      progress,
      totalScore: user.totalScore,
      streak: user.streak,
      unlockedNext: passed,
    });
  } catch (error) {
    console.error("🔥 submitProgress ERROR:", error);
    res.status(500).json({
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
  }
};

// @route GET /api/game/leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({})
      .sort({ totalScore: -1 })
      .limit(10)
      .select("name avatar totalScore currentLevel streak");
    res.json({ leaderboard: topUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};