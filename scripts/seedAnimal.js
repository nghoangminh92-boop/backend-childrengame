// scripts/seedAnimalLevels.js
// Chạy: node scripts/seedAnimalLevels.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import AnimalLevel from "../models/AnimalLevel.js";

dotenv.config();

const GRADE = 1;

const levelsData = [
  {
    level: 1,
    pairs: [
      { name: "Chó", emoji: "🐶" },
      { name: "Mèo", emoji: "🐱" },
      { name: "Gà", emoji: "🐔" },
      { name: "Vịt", emoji: "🦆" },
    ],
  },
  {
    level: 2,
    pairs: [
      { name: "Bò", emoji: "🐮" },
      { name: "Heo", emoji: "🐷" },
      { name: "Dê", emoji: "🐐" },
      { name: "Cừu", emoji: "🐑" },
    ],
  },
  {
    level: 3,
    pairs: [
      { name: "Voi", emoji: "🐘" },
      { name: "Hổ", emoji: "🐯" },
      { name: "Sư tử", emoji: "🦁" },
      { name: "Gấu", emoji: "🐻" },
    ],
  },
  {
    level: 4,
    pairs: [
      { name: "Khỉ", emoji: "🐵" },
      { name: "Hươu cao cổ", emoji: "🦒" },
      { name: "Ngựa vằn", emoji: "🦓" },
      { name: "Tê giác", emoji: "🦏" },
    ],
  },
  {
    level: 5,
    pairs: [
      { name: "Cá", emoji: "🐟" },
      { name: "Cá heo", emoji: "🐬" },
      { name: "Cá voi", emoji: "🐳" },
      { name: "Bạch tuộc", emoji: "🐙" },
    ],
  },
  {
    level: 6,
    pairs: [
      { name: "Chim", emoji: "🐦" },
      { name: "Cú mèo", emoji: "🦉" },
      { name: "Đại bàng", emoji: "🦅" },
      { name: "Công", emoji: "🦚" },
    ],
  },
  {
    level: 7,
    pairs: [
      { name: "Rùa", emoji: "🐢" },
      { name: "Rắn", emoji: "🐍" },
      { name: "Cá sấu", emoji: "🐊" },
      { name: "Thằn lằn", emoji: "🦎" },
    ],
  },
  {
    level: 8,
    pairs: [
      { name: "Bướm", emoji: "🦋" },
      { name: "Ong", emoji: "🐝" },
      { name: "Kiến", emoji: "🐜" },
      { name: "Nhện", emoji: "🕷️" },
    ],
  },
  {
    level: 9,
    pairs: [
      { name: "Thỏ", emoji: "🐰" },
      { name: "Sóc", emoji: "🐿️" },
      { name: "Nhím", emoji: "🦔" },
      { name: "Chuột", emoji: "🐭" },
    ],
  },
  {
    level: 10,
    pairs: [
      { name: "Gấu trúc", emoji: "🐼" },
      { name: "Kangaroo", emoji: "🦘" },
      { name: "Lạc đà", emoji: "🐫" },
      { name: "Cáo", emoji: "🦊" },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Đã kết nối MongoDB");

    for (const item of levelsData) {
      await AnimalLevel.findOneAndUpdate(
        { grade: GRADE, level: item.level },
        { grade: GRADE, level: item.level, pairs: item.pairs },
        { upsert: true, new: true }
      );
      console.log(`✔ Đã seed level ${item.level}`);
    }

    console.log("🎉 Seed xong toàn bộ AnimalLevel!");
    process.exit(0);
  } catch (error) {
    console.error("🔥 Lỗi seed:", error);
    process.exit(1);
  }
};

seed();