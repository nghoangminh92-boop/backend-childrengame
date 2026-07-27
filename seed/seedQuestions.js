// backend/seed/seedQuestions.js
//
// Đọc ngân hàng câu hỏi từ 2 file theo môn:
//   backend/data/math.json
//   backend/data/english.json
//
// Cấu trúc mỗi file: mảng các "chương" (chapter), mỗi chương có level
// và mảng questions bên trong — không cần lặp lại "type"/"level" ở từng câu.
//
// [
//   {
//     "level": 1,
//     "questions": [
//       { "question": "5 + 3 = ?", "options": ["8","5","9","7"], "correctAnswer": "8" },
//       ...
//     ]
//   },
//   ...
// ]
//
// Script này merge lại thành danh sách phẳng (thêm type + level vào từng câu),
// validate đúng 4 quy tắc, rồi ghi vào MongoDB.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question.js"; // sửa lại path/tên file nếu model của bạn khác

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "..", "data");

const SOURCE_FILES = [
  { file: "math.json", type: "math" },
  { file: "english.json", type: "english" },
];

const VALID_TYPES = ["math", "english"];

/**
 * Đọc 1 file chương (vd: math.json) và trả về danh sách câu hỏi dạng phẳng,
 * đã gắn type + level vào từng câu.
 */
function loadChapterFile({ file, type }) {
  const filePath = path.join(DATA_DIR, file);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Không tìm thấy file: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  let chapters;
  try {
    chapters = JSON.parse(raw);
  } catch (err) {
    throw new Error(`File ${file} không phải JSON hợp lệ: ${err.message}`);
  }

  if (!Array.isArray(chapters)) {
    throw new Error(`File ${file} phải là một mảng các chương (chapters).`);
  }

  const flatQuestions = [];

  chapters.forEach((chapter, chapterIdx) => {
    const { level, questions } = chapter;

    if (typeof level !== "number") {
      throw new Error(
        `[${file}] Chương thứ ${chapterIdx + 1}: thiếu "level" hợp lệ (số).`
      );
    }

    if (!Array.isArray(questions)) {
      throw new Error(
        `[${file}] level ${level}: "questions" phải là một mảng.`
      );
    }

    questions.forEach((q, qIdx) => {
      flatQuestions.push({
        type,
        level,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        __source: `${file} > level ${level} > câu #${qIdx + 1}`,
      });
    });
  });

  return flatQuestions;
}

/**
 * Validate đúng 4 quy tắc bắt buộc, throw lỗi rõ ràng nếu sai.
 */
function validateQuestion(q) {
  const errors = [];

  if (!VALID_TYPES.includes(q.type)) {
    errors.push(`type phải là "math" hoặc "english" (đang là "${q.type}")`);
  }

  if (!Number.isInteger(q.level) || q.level < 1 || q.level > 10) {
    errors.push(`level phải là số nguyên từ 1-10 (đang là "${q.level}")`);
  }

  if (!q.question || typeof q.question !== "string") {
    errors.push(`thiếu "question" hoặc không phải chuỗi`);
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`"options" phải có đúng 4 phần tử (đang có ${q.options ? q.options.length : 0})`);
  } else {
    const uniqueOptions = new Set(q.options);
    if (uniqueOptions.size !== 4) {
      errors.push(`"options" có phần tử bị trùng nhau: ${JSON.stringify(q.options)}`);
    }
  }

  if (
    typeof q.correctAnswer !== "string" ||
    !Array.isArray(q.options) ||
    !q.options.includes(q.correctAnswer)
  ) {
    errors.push(
      `"correctAnswer" ("${q.correctAnswer}") phải khớp chính xác 1 trong 4 giá trị của "options"`
    );
  }

  if (errors.length > 0) {
    throw new Error(`Câu hỏi lỗi [${q.__source}]:\n  - ${errors.join("\n  - ")}`);
  }
}

async function seed() {
  console.log("Đang đọc ngân hàng câu hỏi...");

  const allQuestions = SOURCE_FILES.flatMap(loadChapterFile);

  console.log(`Đã đọc ${allQuestions.length} câu hỏi. Đang validate...`);

  allQuestions.forEach(validateQuestion);

  // Bỏ field nội bộ __source trước khi ghi vào DB
  const cleanQuestions = allQuestions.map(({ __source, ...q }) => q);

  console.log("Validate OK. Đang kết nối MongoDB...");

  await mongoose.connect(process.env.MONGO_URI);

  console.log("Xoá câu hỏi cũ...");
  await Question.deleteMany({});

  console.log(`Đang chèn ${cleanQuestions.length} câu hỏi mới...`);
  await Question.insertMany(cleanQuestions);

  const summary = {};
  cleanQuestions.forEach((q) => {
    const key = `${q.type} - level ${q.level}`;
    summary[key] = (summary[key] || 0) + 1;
  });

  console.log("\nTổng kết theo chương:");
  Object.entries(summary)
    .sort()
    .forEach(([key, count]) => console.log(`  ${key}: ${count} câu`));

  console.log("\nSeed thành công!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("\nSeed thất bại:");
  console.error(err.message);
  process.exit(1);
});