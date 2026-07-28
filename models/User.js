import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
      enum: ["boy", "girl", "cat", "dog", "robot"],
      default: "robot",
    },
    // ⭐ ĐỔI: currentLevel giờ lồng theo lớp — Map<grade, level>
    currentLevel: {
      math: { type: Map, of: Number, default: {} },
      english: { type: Map, of: Number, default: {} },
      animal: { type: Map, of: Number, default: {} }, // ⭐ thêm "animal"
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    badges: {
      type: [String],
      default: [],
    },
    lastPlayedAt: {
      type: Date,
    },
    streak: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: { type: String, select: false },
    verificationTokenExpires: { type: Date, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
    lastVerificationEmailSentAt: { type: Date, select: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;