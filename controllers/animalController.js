import Progress from "../models/Progress.js";
import AnimalLevel from "../models/AnimalLevel.js";
import { getChapterMeta } from "../data/chapters.js";
import { submitLevelResult } from "../utils/progressHelpers.js";

export const TOTAL_LEVELS = 10;

// @route GET /api/animal/levels?grade=1
export const getAnimalLevels = async (req, res) => {
  try {
    const g = Number(req.query.grade) || 1;

    const progressList = await Progress.find({ userId: req.user._id, type: "animal", grade: g });
    const progressMap = new Map(progressList.map((p) => [p.level, p]));

    const levels = [];
    for (let lvl = 1; lvl <= TOTAL_LEVELS; lvl++) {
      const prog = progressMap.get(lvl);
      const prevPassed = lvl === 1 || progressMap.get(lvl - 1)?.passed;
      const chapter = getChapterMeta(g, "animal", lvl);
      levels.push({
        level: lvl,
        title: chapter.title,
        description: chapter.description,
        icon: chapter.icon,
        status: prog?.passed ? "completed" : prevPassed ? "unlocked" : "locked",
        bestScore: prog?.score || 0,
      });
    }

    res.json({ type: "animal", grade: g, levels });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/animal/activity?grade=1&level=1
export const getAnimalActivity = async (req, res) => {
  try {
    const g = Number(req.query.grade) || 1;
    const lvl = Number(req.query.level);

    if (!lvl) {
      return res.status(400).json({ message: "Thiếu tham số level" });
    }

    if (lvl > 1) {
      const prevProgress = await Progress.findOne({
        userId: req.user._id,
        type: "animal",
        grade: g,
        level: lvl - 1,
      });
      if (!prevProgress?.passed) {
        return res.status(403).json({ message: "Level này đang bị khóa 🔒" });
      }
    }

    const activity = await AnimalLevel.findOne({ grade: g, level: lvl });
    if (!activity) {
      return res.status(404).json({ message: "Chưa có nội dung cho level này" });
    }

    const shuffledPairs = [...activity.pairs].sort(() => Math.random() - 0.5);

    res.json({
      grade: g,
      level: lvl,
      chapter: getChapterMeta(g, "animal", lvl),
      pairs: shuffledPairs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/animal/submit
export const submitAnimalProgress = async (req, res) => {
  try {
    const { grade, level, correctCount, totalQuestions, score } = req.body;
    const g = Number(grade) || 1;

    if (!level || totalQuestions == null) {
      return res.status(400).json({ message: "Thiếu dữ liệu submit" });
    }

    const result = await submitLevelResult({
      userId: req.user._id,
      type: "animal",
      grade: g,
      level,
      correctCount,
      totalQuestions,
      score,
      totalLevels: TOTAL_LEVELS,
    });

    res.json(result);
  } catch (error) {
    console.error("🔥 submitAnimalProgress ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};