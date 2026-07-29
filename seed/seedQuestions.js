// backend/seed/seedQuestions.js
//
// Script đọc dữ liệu câu hỏi từ các file JSON trong backend/data
// (ví dụ: math-grade1.json, english-grade1.json, animal-grade1.json, ...)
// và import vào MongoDB collection "questions" theo đúng schema Question.js
//
// CÁCH CHẠY (từ thư mục backend, KHÔNG phải từ trong seed/):
//   node seed/seedQuestions.js
//
// Yêu cầu: file .env ở backend root phải có MONGO_URI (biến đúng tên bạn dùng trong config/db.js)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Question from "../models/Question.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ⭐ File này nằm trong backend/seed/, nên phải lùi ra 1 cấp để tới backend/data
const DATA_DIR = path.join(__dirname, "..", "data");

// ⭐ Các file JSON cần import — thêm/bớt tuỳ bạn có bao nhiêu file
// Tên file phải theo định dạng: {type}-grade{grade}.json
const FILES_TO_SEED = [
  "math-grade1.json",
  "english-grade1.json",
  "animal-grade1.json",
  "math-grade2.json",
  "english-grade2.json",
  "math-grade3.json",
  "english-grade3.json",
  "math-grade4.json",
  "english-grade4.json",
  "math-grade5.json",
  "english-grade5.json",
];

// Parse "math-grade1.json" -> { type: "math", grade: 1 }
const parseFileName = (fileName) => {
  const match = fileName.match(/^(math|english|animal)-grade(\d+)\.json$/i); // ⭐ có "animal"
  if (!match) {
    throw new Error(
      `Tên file không đúng định dạng "{type}-grade{grade}.json": ${fileName}`
    );
  }
  return { type: match[1].toLowerCase(), grade: Number(match[2]) };
};

const seed = async () => {
  await connectDB();

  let totalInserted = 0;
  let totalSkippedFiles = 0;
  // ⭐ MỚI: theo dõi riêng các file bị lỗi (khác với file "không tìm thấy")
  // để in báo cáo rõ ràng ở cuối, giúp phát hiện ngay nếu có type chưa
  // được thêm vào enum của Question schema, tránh crash bug âm thầm
  // như đã từng xảy ra (animal-grade1.json làm dừng cả script giữa chừng).
  const failedFiles = [];

  for (const fileName of FILES_TO_SEED) {
    const filePath = path.join(DATA_DIR, fileName);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Không tìm thấy file, bỏ qua: ${fileName}`);
      totalSkippedFiles++;
      continue;
    }

    // ⭐ MỚI: bọc try/catch RIÊNG cho từng file — nếu 1 file lỗi (ví dụ
    // sai enum, sai định dạng JSON, thiếu field bắt buộc...), chỉ file đó
    // bị bỏ qua, KHÔNG làm dừng toàn bộ vòng lặp như trước đây.
    try {
      const { type, grade } = parseFileName(fileName);
      const raw = fs.readFileSync(filePath, "utf-8");
      const chapters = JSON.parse(raw); // [{ level, questions: [...] }, ...]

      const docsToInsert = [];

      for (const chapter of chapters) {
        const { level, questions } = chapter;

        for (const q of questions) {
          docsToInsert.push({
            grade,
            type,
            level,
            question: q.question,
            imageUrl: q.imageUrl || null, // ⭐ copy ảnh nếu câu hỏi có (vd: animal)
            options: q.options,
            correctAnswer: q.correctAnswer,
            generatedByAI: false,
          });
        }
      }

      // ⭐ Xoá dữ liệu cũ của đúng (type, grade) này trước khi insert lại
      // để tránh bị nhân đôi câu hỏi nếu chạy script nhiều lần
      const deleteResult = await Question.deleteMany({ type, grade });
      console.log(
        `🗑️  Đã xoá ${deleteResult.deletedCount} câu hỏi cũ của ${type} - lớp ${grade}`
      );

      const inserted = await Question.insertMany(docsToInsert);
      console.log(
        `✅ Đã import ${inserted.length} câu hỏi từ ${fileName} (type=${type}, grade=${grade})`
      );

      totalInserted += inserted.length;
    } catch (fileErr) {
      // ⭐ Ghi nhận lỗi và TIẾP TỤC sang file kế tiếp thay vì crash cả script
      console.error(`🔥 LỖI khi import ${fileName}: ${fileErr.message}`);
      failedFiles.push({ fileName, message: fileErr.message });
    }
  }

  console.log(`\n🎉 HOÀN TẤT: tổng cộng ${totalInserted} câu hỏi đã được import.`);
  if (totalSkippedFiles > 0) {
    console.log(`⚠️  ${totalSkippedFiles} file bị bỏ qua vì không tìm thấy.`);
  }
  if (failedFiles.length > 0) {
    console.log(`\n🔥 ${failedFiles.length} file bị LỖI khi import (cần sửa và chạy lại):`);
    failedFiles.forEach((f) => console.log(`   - ${f.fileName}: ${f.message}`));
  }

  await mongoose.connection.close();
  process.exit(failedFiles.length > 0 ? 1 : 0);
};

seed().catch((err) => {
  console.error("🔥 SEED ERROR (không thể kết nối DB hoặc lỗi ngoài dự kiến):", err);
  process.exit(1);
});