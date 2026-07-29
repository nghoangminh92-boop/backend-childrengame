import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    type: {
      type: String,
      // ⭐ FIX: thêm "animal" — thiếu giá trị này khiến Question.insertMany()
      // ném lỗi validation "not a valid enum value", làm dừng cả vòng lặp
      // seed giữa chừng (bug đã gây ra việc lớp 2-5 Toán/Anh không được import).
      enum: ["math", "english", "animal"],
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
    // ⭐ FIX: field này bị THIẾU hoàn toàn trước đây. Mongoose mặc định
    // strict: true nên bất kỳ field nào không khai báo trong schema sẽ bị
    // âm thầm loại bỏ lúc lưu — seed script có gửi imageUrl nhưng nó không
    // bao giờ thực sự được lưu vào DB, khiến câu hỏi animal (dạng "nhìn ảnh
    // đoán con vật") mất ảnh mà không có lỗi nào báo ra.
    imageUrl: {
      type: String,
      default: null,
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

questionSchema.index({ grade: 1, type: 1, level: 1 });

const Question = mongoose.model("Question", questionSchema);
export default Question;