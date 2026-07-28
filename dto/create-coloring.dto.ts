// create-coloring.dto.ts
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateColoringDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  outlineId: string;

  // ⭐ Kiểm tra sơ bộ đúng định dạng data URL ảnh PNG để tránh lưu rác/
  // dữ liệu độc hại vào DB. Không giới hạn kích thước ở DTO — nên giới
  // hạn thêm ở tầng NestJS (ví dụ bodyParser limit) nếu cần chặt hơn.
  @IsString()
  @IsNotEmpty()
  @Matches(/^data:image\/png;base64,/, {
    message: "imageData phải là chuỗi base64 định dạng PNG hợp lệ",
  })
  imageData: string;
}
