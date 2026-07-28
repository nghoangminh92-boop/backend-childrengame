// Định nghĩa "Chương học" theo từng Lớp → Môn → Level.
// CHAPTERS[grade][type][level] = { title, description, icon }

// Định nghĩa "Chương học" theo từng Lớp → Môn → Level.
// CHAPTERS[grade][type][level] = { title, description, icon }

export const CHAPTERS = {
  1: {
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
  },

  2: {
    math: {
      1: { title: "Cộng trừ trong phạm vi 100", description: "Ôn tập và mở rộng cộng trừ số có hai chữ số", icon: "➕" },
      2: { title: "Phép cộng có nhớ", description: "Cộng hai số có nhớ sang hàng chục, hàng trăm", icon: "🔁" },
      3: { title: "Phép trừ có nhớ", description: "Trừ hai số có nhớ, mượn từ hàng cao hơn", icon: "🔂" },
      4: { title: "Bảng nhân 2 đến 5", description: "Ôn tập và áp dụng thành thạo bảng nhân 2, 3, 4, 5", icon: "✖️" },
      5: { title: "Bảng nhân 6 và 7", description: "Học thuộc và áp dụng bảng nhân 6, 7", icon: "✳️" },
      6: { title: "Phép chia trong bảng nhân", description: "Chia dựa trên các bảng nhân đã học", icon: "➗" },
      7: { title: "Đơn vị đo độ dài", description: "Làm quen cm, dm, m và cách đổi đơn vị", icon: "📏" },
      8: { title: "Xem giờ đồng hồ", description: "Đọc giờ đúng và giờ rưỡi trên đồng hồ kim", icon: "🕐" },
      9: { title: "Hình học cơ bản", description: "Nhận biết hình tam giác, tứ giác, hình tròn", icon: "🔺" },
      10: { title: "Toán đố hai bước tính", description: "Giải bài toán cần thực hiện hai phép tính", icon: "🧠" },
    },
    english: {
      1: { title: "School Things", description: "Học từ vựng về đồ dùng học tập", icon: "🎒" },
      2: { title: "Weather", description: "Học từ vựng và câu miêu tả thời tiết", icon: "☀️" },
      3: { title: "Places in Town", description: "Học tên các địa điểm quen thuộc trong thị trấn", icon: "🏫" },
      4: { title: "My House", description: "Học từ vựng về các phòng và đồ vật trong nhà", icon: "🏠" },
      5: { title: "Food & Drinks", description: "Học từ vựng về món ăn và đồ uống", icon: "🍔" },
      6: { title: "Clothes", description: "Học từ vựng về quần áo và trang phục", icon: "👕" },
      7: { title: "Simple Present Tense", description: "Ngữ pháp: thì hiện tại đơn cơ bản", icon: "📗" },
      8: { title: "Prepositions", description: "Học giới từ chỉ vị trí: in, on, under...", icon: "📍" },
      9: { title: "Hobbies", description: "Học từ vựng và câu nói về sở thích", icon: "⚽" },
      10: { title: "Short Conversations", description: "Luyện tập các đoạn hội thoại ngắn thường gặp", icon: "💬" },
    },
  },

  3: {
    math: {
      1: { title: "Ôn tập phép cộng trừ có nhớ", description: "Củng cố cộng trừ số có ba chữ số", icon: "➕" },
      2: { title: "Bảng nhân 8 và 9", description: "Học thuộc và áp dụng bảng nhân 8, 9", icon: "✖️" },
      3: { title: "Phép chia có dư", description: "Làm quen phép chia có số dư", icon: "➗" },
      4: { title: "Nhân số có hai chữ số", description: "Nhân số có hai chữ số với số có một chữ số", icon: "🔢" },
      5: { title: "Chia số có hai chữ số", description: "Chia số có hai, ba chữ số cho số có một chữ số", icon: "➗" },
      6: { title: "Phân số cơ bản", description: "Làm quen khái niệm phân số đơn giản", icon: "🍕" },
      7: { title: "Đơn vị đo khối lượng", description: "Làm quen gam, ki-lô-gam và cách đổi đơn vị", icon: "⚖️" },
      8: { title: "Chu vi hình học", description: "Tính chu vi hình vuông, hình chữ nhật", icon: "📐" },
      9: { title: "Diện tích hình học", description: "Tính diện tích hình vuông, hình chữ nhật", icon: "🟩" },
      10: { title: "Toán đố tổng hợp", description: "Giải các bài toán đố kết hợp nhiều phép tính", icon: "🧠" },
    },
    english: {
      1: { title: "Daily Routine", description: "Học từ vựng và câu về hoạt động hàng ngày", icon: "⏰" },
      2: { title: "Jobs & Occupations", description: "Học tên các nghề nghiệp phổ biến", icon: "👩‍⚕️" },
      3: { title: "Seasons & Months", description: "Học tên các mùa và các tháng trong năm", icon: "🍂" },
      4: { title: "Comparatives", description: "Ngữ pháp: so sánh hơn giữa hai đối tượng", icon: "📊" },
      5: { title: "Directions", description: "Học từ vựng chỉ đường: turn left, go straight...", icon: "🧭" },
      6: { title: "Sports", description: "Học từ vựng về các môn thể thao", icon: "🏀" },
      7: { title: "Simple Past Tense", description: "Ngữ pháp: thì quá khứ đơn cơ bản", icon: "📙" },
      8: { title: "Feelings", description: "Học từ vựng diễn tả cảm xúc", icon: "😊" },
      9: { title: "Shopping", description: "Học từ vựng và mẫu câu khi đi mua sắm", icon: "🛒" },
      10: { title: "Short Stories", description: "Luyện đọc hiểu đoạn văn ngắn đơn giản", icon: "📖" },
    },
  },

  4: {
    math: {
      1: { title: "Số tự nhiên lớn", description: "Đọc, viết, so sánh các số có nhiều chữ số", icon: "🔢" },
      2: { title: "Cộng trừ số có nhiều chữ số", description: "Thực hiện cộng trừ số có 4-6 chữ số", icon: "➕" },
      3: { title: "Nhân với số có hai chữ số", description: "Nhân số có nhiều chữ số với số có hai chữ số", icon: "✖️" },
      4: { title: "Chia cho số có hai chữ số", description: "Thực hiện phép chia cho số có hai chữ số", icon: "➗" },
      5: { title: "Phân số và tính chất", description: "Rút gọn, quy đồng và so sánh phân số", icon: "🍕" },
      6: { title: "Cộng trừ phân số", description: "Thực hiện cộng, trừ hai phân số", icon: "➕" },
      7: { title: "Nhân chia phân số", description: "Thực hiện nhân, chia hai phân số", icon: "✖️" },
      8: { title: "Hình bình hành & hình thoi", description: "Nhận biết và tính diện tích hình bình hành, hình thoi", icon: "🔷" },
      9: { title: "Đơn vị đo diện tích", description: "Làm quen cm², dm², m² và cách đổi đơn vị", icon: "📐" },
      10: { title: "Toán đố về tỉ số", description: "Giải toán có liên quan đến tỉ số hai số", icon: "🧠" },
    },
    english: {
      1: { title: "Adjectives", description: "Học các tính từ miêu tả người và vật", icon: "✨" },
      2: { title: "Free Time Activities", description: "Học từ vựng về hoạt động giải trí", icon: "🎮" },
      3: { title: "Future Plans", description: "Ngữ pháp: cách nói về dự định tương lai", icon: "📅" },
      4: { title: "Nature", description: "Học từ vựng về thiên nhiên, môi trường", icon: "🌳" },
      5: { title: "Health & Illness", description: "Học từ vựng về sức khỏe và bệnh thông thường", icon: "🤒" },
      6: { title: "Modal Verbs", description: "Ngữ pháp: can, must, should", icon: "📘" },
      7: { title: "Countries & Nationalities", description: "Học tên các quốc gia và quốc tịch", icon: "🌍" },
      8: { title: "At the Restaurant", description: "Học mẫu câu gọi món và giao tiếp ở nhà hàng", icon: "🍽️" },
      9: { title: "Reading Comprehension", description: "Luyện đọc hiểu đoạn văn trung bình", icon: "📖" },
      10: { title: "Writing Simple Paragraphs", description: "Luyện viết đoạn văn ngắn theo chủ đề", icon: "✍️" },
    },
  },

  5: {
    math: {
      1: { title: "Ôn tập phân số", description: "Củng cố các phép tính với phân số", icon: "🍕" },
      2: { title: "Số thập phân", description: "Đọc, viết và so sánh số thập phân", icon: "🔢" },
      3: { title: "Cộng trừ số thập phân", description: "Thực hiện cộng, trừ các số thập phân", icon: "➕" },
      4: { title: "Nhân chia số thập phân", description: "Thực hiện nhân, chia các số thập phân", icon: "✖️" },
      5: { title: "Tỉ số phần trăm", description: "Tính tỉ số phần trăm và ứng dụng thực tế", icon: "💯" },
      6: { title: "Hình tam giác", description: "Tính diện tích và các yếu tố của hình tam giác", icon: "🔺" },
      7: { title: "Hình thang", description: "Tính diện tích và các yếu tố của hình thang", icon: "🔷" },
      8: { title: "Hình hộp chữ nhật & hình lập phương", description: "Tính diện tích, thể tích hình khối cơ bản", icon: "📦" },
      9: { title: "Vận tốc, quãng đường, thời gian", description: "Giải toán chuyển động đều", icon: "🚗" },
      10: { title: "Toán đố tổng hợp lớp 5", description: "Ôn tập tổng hợp các dạng toán đã học", icon: "🧠" },
    },
    english: {
      1: { title: "Past Continuous", description: "Ngữ pháp: thì quá khứ tiếp diễn", icon: "📙" },
      2: { title: "Comparative & Superlative", description: "So sánh hơn và so sánh nhất", icon: "📊" },
      3: { title: "Environment & Recycling", description: "Học từ vựng về môi trường và tái chế", icon: "♻️" },
      4: { title: "Technology", description: "Học từ vựng về công nghệ và thiết bị", icon: "💻" },
      5: { title: "Giving Opinions", description: "Học mẫu câu bày tỏ ý kiến cá nhân", icon: "💭" },
      6: { title: "Conditional Sentences", description: "Ngữ pháp: câu điều kiện loại 1 cơ bản", icon: "📘" },
      7: { title: "Travel & Transportation", description: "Học từ vựng về du lịch và phương tiện", icon: "✈️" },
      8: { title: "Famous Places", description: "Học từ vựng về các địa danh nổi tiếng", icon: "🗽" },
      9: { title: "Reading Longer Texts", description: "Luyện đọc hiểu đoạn văn dài hơn", icon: "📖" },
      10: { title: "Writing a Short Essay", description: "Luyện viết bài văn ngắn hoàn chỉnh", icon: "✍️" },
    },
  },
};

export const getChapterMeta = (grade, type, level) => {
  return (
    CHAPTERS[grade]?.[type]?.[level] || {
      title: `Chương ${level}`,
      description: "Ôn tập tổng hợp",
      icon: "📖", 
    }
  );
};
