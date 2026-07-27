import mongoose from "mongoose";

const statSchema = new mongoose.Schema(
  {
    totalStars: { type: Number, default: 0 },
    totalBadges: { type: Number, default: 0 },
    totalLevels: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Stat", statSchema);