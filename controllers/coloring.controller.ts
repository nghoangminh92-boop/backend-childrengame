// coloring.service.ts
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Coloring, ColoringDocument } from "./coloring.schema";
import { CreateColoringDto } from "./create-coloring.dto";

@Injectable()
export class ColoringService {
  constructor(
    @InjectModel(Coloring.name) private coloringModel: Model<ColoringDocument>
  ) {}

  async create(userId: string, dto: CreateColoringDto) {
    const created = await this.coloringModel.create({
      userId: new Types.ObjectId(userId),
      title: dto.title,
      outlineId: dto.outlineId,
      imageData: dto.imageData,
    });
    return created;
  }

  async findAllByUser(userId: string) {
    // ⭐ Sắp xếp mới nhất lên đầu, không trả imageData đầy đủ trong danh
    // sách lớn sẽ tốt hơn cho hiệu năng — nhưng vì đây là bản v1 đơn giản
    // (gallery cá nhân, số lượng ít) nên trả nguyên để FE hiển thị trực tiếp.
    return this.coloringModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean();
  }

  async remove(userId: string, id: string) {
    const doc = await this.coloringModel.findById(id);
    if (!doc) throw new NotFoundException("Không tìm thấy tranh");
    if (doc.userId.toString() !== userId) {
      throw new ForbiddenException("Bạn không có quyền xoá tranh này");
    }
    await doc.deleteOne();
    return { success: true };
  }
}
