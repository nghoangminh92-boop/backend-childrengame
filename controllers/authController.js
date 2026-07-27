import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  currentLevel: user.currentLevel,
  totalScore: user.totalScore,
  badges: user.badges,
  streak: user.streak,
  isVerified: user.isVerified,
  role: user.role,
});

// @route POST /api/auth/google
// body: { idToken }
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Thiếu idToken" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({ message: "Tài khoản Google không có email" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Tài khoản hoàn toàn mới → tạo mới, tự động xác thực (Google đã xác thực email)
      user = await User.create({
        name: name || "Học sinh",
        email: email.toLowerCase(),
        googleId,
        avatar: "robot",
        isVerified: true,
      });
    } else if (!user.googleId) {
      // Tài khoản cũ (đăng ký bằng email/password trước đây) — liên kết thêm Google
      user.googleId = googleId;
      user.isVerified = true;
      await user.save({ validateModifiedOnly: true });
    }

    const token = generateToken(user._id);
    res.json({ token, user: publicUser(user) });
  } catch (error) {
    console.error("🔥 Google login error:", error.message);
    res.status(401).json({ message: "Đăng nhập Google thất bại, vui lòng thử lại" });
  }
};

// @route GET /api/auth/me
export const getMe = async (req, res) => {
  res.json({ user: publicUser(req.user) });
};