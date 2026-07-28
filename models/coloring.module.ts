// coloring.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Coloring, ColoringSchema } from "./coloring.schema";
import { ColoringController } from "./coloring.controller";
import { ColoringService } from "./coloring.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coloring.name, schema: ColoringSchema }]),
  ],
  controllers: [ColoringController],
  providers: [ColoringService],
})
export class ColoringModule {}

// ⭐ Sau khi tạo file này, nhớ import ColoringModule vào mảng `imports`
// của AppModule (app.module.ts) — giống cách các module khác (Dish,
// Review, File...) đã được đăng ký, thì route /coloring mới hoạt động.
