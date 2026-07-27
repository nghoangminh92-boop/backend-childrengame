// Template HTML cho email, phong cách vui nhộn thân thiện trẻ em, dùng inline CSS
// vì phần lớn email client không hỗ trợ CSS ngoài / class.

const wrapper = (title, bodyHtml) => `
<!doctype html>
<html lang="vi">
  <body style="margin:0;padding:0;background:#0b0f1e;font-family:'Segoe UI',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f1e;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:linear-gradient(135deg,#1a1039,#0b0f1e);border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);">
            <tr>
              <td style="padding:32px 32px 8px;text-align:center;">
                <div style="font-size:40px;">🎮</div>
                <h1 style="color:#ffffff;font-size:22px;margin:8px 0 0;">EduGame</h1>
                <p style="color:#b6b9d1;font-size:13px;margin:4px 0 0;">Học mà chơi, chơi mà học!</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 8px;">
                <h2 style="color:#ffffff;font-size:19px;margin:0 0 12px;">${title}</h2>
                <div style="color:#e5e7ef;font-size:15px;line-height:1.6;">${bodyHtml}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;text-align:center;">
                <p style="color:#7c7f97;font-size:12px;margin:0;">
                  Nếu bạn không thực hiện yêu cầu này, bạn có thể bỏ qua email này một cách an toàn.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const buttonHtml = (url, label) => `
  <div style="text-align:center;margin:24px 0;">
    <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#7c5cff,#a78bfa);color:#ffffff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;font-size:15px;">
      ${label}
    </a>
  </div>
`;

export const welcomeEmailTemplate = ({ name }) => ({
  subject: "🎉 Chào mừng bạn đến với ChildrenGame!",
  html: wrapper(
    `Chào mừng, ${name}! 🎉`,
    `
      <p>Tài khoản của bạn đã sẵn sàng! Bây giờ bạn có thể bắt đầu chinh phục các chương Toán học 🧮 và Tiếng Anh 🔤 đầy thử thách.</p>
      <p>Mỗi chương học có 10 câu hỏi, trả lời đúng từ 70% trở lên để mở khóa chương tiếp theo. Cố gắng đạt 3 sao ⭐⭐⭐ ở mỗi chương nhé!</p>
      <p>Chúc bạn học vui! 🚀</p>
    `
  ),
});

export const verifyEmailTemplate = ({ name, verifyUrl }) => ({
  subject: "✅ Xác thực email ChildrenGame của bạn",
  html: wrapper(
    `Xin chào, ${name}! 👋`,
    `
      <p>Cảm ơn bạn đã đăng ký ChildrenGame. Vui lòng xác thực email để đảm bảo an toàn cho tài khoản của bạn:</p>
      ${buttonHtml(verifyUrl, "Xác thực email của tôi")}
      <p style="color:#b6b9d1;font-size:13px;">Liên kết này sẽ hết hạn sau 24 giờ. Nếu nút bấm không hoạt động, sao chép đường dẫn sau vào trình duyệt:</p>
      <p style="word-break:break-all;color:#8b93ff;font-size:12px;">${verifyUrl}</p>
    `
  ),
});

export const resetPasswordEmailTemplate = ({ name, resetUrl }) => ({
  subject: "🔑 Yêu cầu đặt lại mật khẩu ChildrenGame",
  html: wrapper(
    `Đặt lại mật khẩu`,
    `
      <p>Xin chào ${name}, chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
      ${buttonHtml(resetUrl, "Đặt lại mật khẩu")}
      <p style="color:#b6b9d1;font-size:13px;">Liên kết này sẽ hết hạn sau 1 giờ. Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này — mật khẩu của bạn vẫn an toàn.</p>
      <p style="word-break:break-all;color:#8b93ff;font-size:12px;">${resetUrl}</p>
    `
  ),
});
