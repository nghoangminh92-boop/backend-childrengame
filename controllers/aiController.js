import OpenAI from "openai";
import Question from "../models/Question.js";

let openaiClient = null;
if (process.env.OPENAI_API_KEY) {
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const buildPrompt = (type, level) => {
  if (type === "math") {
    return `Tạo 1 câu hỏi trắc nghiệm Toán học cho trẻ em, độ khó tương ứng level ${level} (level càng cao càng khó, tối đa level 10).
Trả về DUY NHẤT một JSON object hợp lệ, không thêm chữ nào khác, đúng format:
{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "..."}
correctAnswer phải trùng khớp chính xác với 1 trong 4 phần tử của options.`;
  }
  return `Tạo 1 câu hỏi trắc nghiệm Tiếng Anh cho trẻ em (từ vựng/ngữ pháp cơ bản), độ khó tương ứng level ${level} (level càng cao càng khó, tối đa level 10).
Trả về DUY NHẤT một JSON object hợp lệ, không thêm chữ nào khác, đúng format:
{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "..."}
correctAnswer phải trùng khớp chính xác với 1 trong 4 phần tử của options.`;
};

const tryGenerateWithAI = async (type, level) => {
  if (!openaiClient) return null;
  try {
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: buildPrompt(type, level) }],
      temperature: 0.8,
      max_tokens: 300,
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    if (
      !parsed.question ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      !parsed.correctAnswer
    ) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.warn("⚠️ AI generate question thất bại, fallback sang DB:", error.message);
    return null;
  }
};

// @route POST /api/ai/generate-question
// body: { type, level }
export const generateQuestion = async (req, res) => {
  try {
    const { type, level } = req.body;
    const lvl = Number(level);

    if (!["math", "english"].includes(type) || !lvl) {
      return res.status(400).json({ message: "Thiếu hoặc sai type/level" });
    }

    const aiQuestion = await tryGenerateWithAI(type, lvl);

    if (aiQuestion) {
      // Lưu lại vào DB để tái sử dụng / làm dày ngân hàng câu hỏi
      const saved = await Question.create({
        type,
        level: lvl,
        question: aiQuestion.question,
        options: aiQuestion.options,
        correctAnswer: aiQuestion.correctAnswer,
        generatedByAI: true,
      });
      return res.json({ source: "openai", question: saved });
    }

    // ---- Fallback: lấy ngẫu nhiên 1 câu có sẵn trong DB ----
    const fallback = await Question.aggregate([
      { $match: { type, level: lvl } },
      { $sample: { size: 1 } },
    ]);

    if (!fallback.length) {
      return res.status(404).json({
        message: "Không có câu hỏi fallback trong DB cho type/level này",
      });
    }

    res.json({ source: "fallback-db", question: fallback[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
