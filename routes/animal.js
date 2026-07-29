import express from "express";
import { protect } from "../middleware/auth.js"; // ⚠️ đổi đúng path/tên middleware bạn đang dùng
import {
  getAnimalLevels,
  getAnimalActivity,
  submitAnimalProgress,
} from "../controllers/animalController.js";

const router = express.Router();

router.get("/levels", protect, getAnimalLevels);
router.get("/activity", protect, getAnimalActivity);
router.post("/submit", protect, submitAnimalProgress);

export default router;