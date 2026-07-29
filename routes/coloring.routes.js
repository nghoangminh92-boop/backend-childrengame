// routes/coloring.routes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import { createColoring, getMyColorings, deleteColoring } from "../controllers/coloring.controller.js";

const router = express.Router();

router.post("/", protect, createColoring);
router.get("/mine", protect, getMyColorings);
router.delete("/:id", protect, deleteColoring);

export default router;