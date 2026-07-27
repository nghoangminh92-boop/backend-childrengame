import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn(
        "⚠️  MONGO_URI chưa được cấu hình trong file .env — server sẽ chạy nhưng các API cần DB sẽ lỗi."
      );
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
