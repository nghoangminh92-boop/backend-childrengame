import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    type: {
      type: String,
      enum: ["math", "english"],
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    correctCount: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    passed: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// ⭐ Đổi unique key: thêm grade
progressSchema.index({ userId: 1, grade: 1, type: 1, level: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;