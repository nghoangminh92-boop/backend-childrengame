import mongoose from "mongoose";

const animalLevelSchema = new mongoose.Schema(
  {
    grade: {
      type: Number,
      required: true,
      default: 1,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
    },
    pairs: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          emoji: { type: String },
          imageUrl: { type: String },
        },
      ],
      validate: {
        validator: (arr) => arr.length >= 3,
        message: "Mỗi level cần ít nhất 3 cặp con vật",
      },
      required: true,
    },
  },
  { timestamps: true }
);

animalLevelSchema.index({ grade: 1, level: 1 }, { unique: true });

const AnimalLevel = mongoose.model("AnimalLevel", animalLevelSchema);
export default AnimalLevel;