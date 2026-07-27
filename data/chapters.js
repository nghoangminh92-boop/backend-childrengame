// Định nghĩa "Chương học" (chủ đề kiến thức cụ thể) cho từng level.
// Mỗi chương có: title (tên chương), description (mô tả kỹ năng), icon.
// File này là nguồn dữ liệu chung cho cả seed script và API /api/game/levels.

export const CHAPTERS = {
  math: {
    1: { title: "Cộng trong phạm vi 10", description: "Làm quen phép cộng các số từ 1 đến 10", icon: "➕" },
    2: { title: "Trừ trong phạm vi 10", description: "Làm quen phép trừ các số từ 1 đến 10", icon: "➖" },
    3: { title: "Cộng trừ trong phạm vi 20", description: "Cộng, trừ các số có kết quả đến 20", icon: "🔢" },
    4: { title: "Bảng nhân 2 và 3", description: "Học thuộc và áp dụng bảng nhân 2, 3", icon: "✖️" },
    5: { title: "Bảng nhân 4 và 5", description: "Học thuộc và áp dụng bảng nhân 4, 5", icon: "✳️" },
    6: { title: "Phép chia cơ bản", description: "Làm quen phép chia với số chia nhỏ", icon: "➗" },
    7: { title: "So sánh số", description: "So sánh lớn hơn, nhỏ hơn, bằng nhau", icon: "⚖️" },
    8: { title: "Cộng trừ trong phạm vi 100", description: "Cộng, trừ các số có hai chữ số", icon: "💯" },
    9: { title: "Nhân chia hỗn hợp", description: "Kết hợp nhân và chia trong cùng bài toán", icon: "🧮" },
    10: { title: "Toán đố ứng dụng", description: "Vận dụng các phép tính vào tình huống thực tế", icon: "🧠" },
  },
  english: {
    1: { title: "Colors", description: "Học tên các màu sắc cơ bản", icon: "🎨" },
    2: { title: "Animals", description: "Học tên các con vật quen thuộc", icon: "🐾" },
    3: { title: "Family", description: "Học từ vựng về các thành viên gia đình", icon: "👨‍👩‍👧‍👦" },
    4: { title: "Numbers", description: "Học đếm số bằng tiếng Anh", icon: "🔢" },
    5: { title: "Fruits", description: "Học tên các loại trái cây", icon: "🍎" },
    6: { title: "Body Parts", description: "Học từ vựng về các bộ phận cơ thể", icon: "🖐️" },
    7: { title: "Greetings", description: "Học các câu chào hỏi cơ bản", icon: "👋" },
    8: { title: "Action Verbs", description: "Học các động từ chỉ hành động", icon: "🏃" },
    9: { title: "Days & Time", description: "Học tên các ngày trong tuần và thời gian", icon: "📅" },
    10: { title: "Simple Grammar", description: "Ngữ pháp cơ bản: to be, số nhiều...", icon: "📘" },
  },
};

export const getChapterMeta = (type, level) => {
  return (
    CHAPTERS[type]?.[level] || {
      title: `Chương ${level}`,
      description: "Ôn tập tổng hợp",
      icon: "📖",
    }
  );
};
