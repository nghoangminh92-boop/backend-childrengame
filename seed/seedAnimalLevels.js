import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AnimalLevel from "../models/AnimalLevel.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");

async function seed() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "animal-grade1.json"), "utf-8");
  const levels = JSON.parse(raw);

  await mongoose.connect(process.env.MONGO_URI);

  await AnimalLevel.deleteMany({ grade: 1 });

  const docs = levels.map((l) => ({ grade: 1, level: l.level, pairs: l.pairs }));
  await AnimalLevel.insertMany(docs);

  console.log(`✅ Đã seed ${docs.length} level Animal (Lớp 1)`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed Animal thất bại:", err.message);
  process.exit(1);
});