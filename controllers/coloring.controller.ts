// coloring.controller.ts
//
// ⚠️ LƯU Ý TÍCH HỢP: file này giả định dự án đã có sẵn một AuthGuard (ví dụ
// JwtAuthGuard) gắn `req.user.userId` hoặc tương đương sau khi xác thực —
// giống cách các module khác (bài review, dish...) trong project đang dùng.
// Hãy đổi đường dẫn import `JwtAuthGuard` bên dưới cho khớp với vị trí thật
// trong project (ví dụ "../auth/jwt-auth.guard").
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard"; // ⭐ chỉnh lại path cho đúng project
import { ColoringService } from "./coloring.service";
import { CreateColoringDto } from "./create-coloring.dto";

@Controller("coloring")
@UseGuards(JwtAuthGuard)
export class ColoringController {
  constructor(private readonly coloringService: ColoringService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateColoringDto) {
    return this.coloringService.create(req.user.userId, dto);
  }

  @Get("mine")
  findMine(@Req() req) {
    return this.coloringService.findAllByUser(req.user.userId);
  }

  @Delete(":id")
  remove(@Req() req, @Param("id") id: string) {
    return this.coloringService.remove(req.user.userId, id);
  }
}
