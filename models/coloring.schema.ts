// coloring.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ColoringDocument = Coloring & Document;

@Schema({ timestamps: true })
export class Coloring {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  outlineId: string;

  // ⭐ Lưu trực tiếp dạng base64 data URL (PNG) cho bản v1 — đơn giản,
  // không cần thêm hạ tầng upload. Ảnh canvas 400x400 tô màu thường
  // dưới vài trăm KB nên vẫn nằm an toàn trong giới hạn document Mongo (16MB).
  //
  // Nếu sau này lượng tranh lưu lớn dần và muốn tối ưu, có thể chuyển sang
  // lưu file qua FileModule/FileController (multer) sẵn có của dự án và
  // chỉ giữ lại `imageUrl` ở đây thay vì base64 đầy đủ.
  @Prop({ required: true })
  imageData: string;
}

export const ColoringSchema = SchemaFactory.createForClass(Coloring);
