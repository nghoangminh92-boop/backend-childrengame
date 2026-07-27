import express from "express";
import { generateQuestion } from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate-question", protect, generateQuestion);

export default router;
