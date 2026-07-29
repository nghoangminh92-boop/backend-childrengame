// controllers/coloring.controller.js
import Coloring from "../models/coloring.js";

const isValidPngDataUrl = (str) =>
  typeof str === "string" && str.startsWith("data:image/png;base64,");

// @route POST /api/coloring
export const createColoring = async (req, res) => {
  try {
    const { title, outlineId, imageData } = req.body;

    if (!title || !outlineId || !imageData) {
      return res.status(400).json({ message: "Thiếu title/outlineId/imageData" });
    }
    if (!isValidPngDataUrl(imageData)) {
      return res.status(400).json({ message: "imageData phải là chuỗi base64 định dạng PNG hợp lệ" });
    }

    const coloring = await Coloring.create({
      userId: req.user._id,
      title,
      outlineId,
      imageData,
    });

    res.status(201).json(coloring);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/coloring/mine
export const getMyColorings = async (req, res) => {
  try {
    const items = await Coloring.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/coloring/:id
export const deleteColoring = async (req, res) => {
  try {
    const item = await Coloring.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Không tìm thấy tranh" });
    }
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Bạn không có quyền xoá tranh này" });
    }
    await item.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};