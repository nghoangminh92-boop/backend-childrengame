// models/Coloring.js
import mongoose from "mongoose";

const coloringSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    outlineId: { type: String, required: true },
    // ⭐ Lưu trực tiếp base64 PNG (data URL) — đơn giản cho bản v1, không
    // cần thêm hạ tầng upload file. Ảnh canvas 400x400 thường vài trăm KB,
    // vẫn nằm an toàn trong giới hạn document MongoDB (16MB).
    imageData: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Coloring", coloringSchema);