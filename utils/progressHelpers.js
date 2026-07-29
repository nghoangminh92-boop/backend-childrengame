import Progress from "../models/Progress.js";
import User from "../models/User.js";

export const PASS_PERCENT = 0.7;

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const calculateNewStreak = (lastPlayedAt, currentStreak) => {
  const today = startOfDay(new Date());
  if (!lastPlayedAt) return 1;
  const lastDay = startOfDay(lastPlayedAt);
  const diffDays = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return currentStreak || 1;
  if (diffDays === 1) return (currentStreak || 0) + 1;
  return 1;
};

/**
 * Dùng chung cho MỌI loại game khi nộp kết quả 1 level
 * (Toán, Tiếng Anh, Animal, và sau này thêm game nào cũng gọi hàm này).
 */
export const submitLevelResult = async ({
  userId,
  type,
  grade,
  level,
  correctCount,
  totalQuestions,
  score,
  totalLevels = 10,
}) => {
  const percent = correctCount / totalQuestions;
  const passed = percent >= PASS_PERCENT;

  let progress;
  try {
    const existing = await Progress.findOne({ userId, type, grade, level });
    progress = await Progress.findOneAndUpdate(
      { userId, type, grade, level },
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
      const existing = await Progress.findOne({ userId, type, grade, level });
      progress = await Progress.findOneAndUpdate(
        { userId, type, grade, level },
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

  const user = await User.findById(userId);
  user.totalScore += score || 0;

  const gradeKey = String(grade);
  const currentLevelForGrade = user.currentLevel[type].get(gradeKey) || 1;
  if (passed && level >= currentLevelForGrade) {
    user.currentLevel[type].set(gradeKey, level + 1);
  }

  const newStreak = calculateNewStreak(user.lastPlayedAt, user.streak);
  user.streak = newStreak;
  user.lastPlayedAt = new Date();

  if (passed && level === 5 && !user.badges.includes("halfway-hero")) {
    user.badges.push("halfway-hero");
  }
  if (passed && level === totalLevels && !user.badges.includes("champion")) {
    user.badges.push("champion");
  }
  if (newStreak === 7 && !user.badges.includes("streak-7")) {
    user.badges.push("streak-7");
  }
  if (newStreak === 30 && !user.badges.includes("streak-30")) {
    user.badges.push("streak-30");
  }

  await user.save();

  return {
    passed,
    percent: Math.round(percent * 100),
    progress,
    totalScore: user.totalScore,
    streak: user.streak,
    unlockedNext: passed,
  };
};  