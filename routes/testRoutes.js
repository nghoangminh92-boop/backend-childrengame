import express from "express";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.get("/send-test", async (req, res) => {
  try {
    await sendEmail({
      to: "yourgmail@gmail.com",
      subject: "Test Email",
      html: "<h1>Email hoạt động!</h1>",
    });

    res.json({ message: "Đã gửi email test!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
