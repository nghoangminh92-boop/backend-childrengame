import User from "../models/User.js";
// thêm vào cuối run() ở trên, TRƯỚC khi disconnect:

const users = await User.find({});
for (const user of users) {
  const rawMath = user.currentLevel?.math;
  const rawEnglish = user.currentLevel?.english;

  user.currentLevel = { math: new Map(), english: new Map() };
  if (typeof rawMath === "number") {
    user.currentLevel.math.set(String(DEFAULT_GRADE), rawMath);
  }
  if (typeof rawEnglish === "number") {
    user.currentLevel.english.set(String(DEFAULT_GRADE), rawEnglish);
  }
  await user.save();
}
console.log(`✅ User: đã migrate currentLevel cho ${users.length} user`);