import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["math", "english"],
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: (arr) => arr.length === 4,
        message: "Phải có đúng 4 lựa chọn",
      },
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    generatedByAI: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

questionSchema.index({ type: 1, level: 1 });

const Question = mongoose.model("Question", questionSchema);
export default Question;
