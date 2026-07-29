import express from "express";
import {
  getLevels,
  getQuestions,
  submitProgress,
  getLeaderboard,
} from "../controllers/gameController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/levels", getLevels);
router.get("/questions", getQuestions);
router.post("/submit", submitProgress);
router.get("/leaderboard", getLeaderboard);

export default router;
  