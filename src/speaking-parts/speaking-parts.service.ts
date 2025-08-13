import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SpeakingPart } from './entities/speaking-part.entity.js';
import { CreateSpeakingPartDto } from './dto/create-speaking-part.dto.js';
import { UpdateSpeakingPartDto } from './dto/update-speaking-part.dto.js';
import { SpeakingTests } from '../speaking-tests/entities/speaking-test.entity.js';

@Injectable()
export class SpeakingPartsService {
  constructor(
    @InjectModel(SpeakingPart)
    private speakingPartModel: typeof SpeakingPart,
  ) {}

  async create(createDto: CreateSpeakingPartDto): Promise<SpeakingPart> {
    return this.speakingPartModel.create(createDto);
  }

  async findAll(): Promise<SpeakingPart[]> {
    return this.speakingPartModel.findAll({
      include: [SpeakingTests]
    });
  }

  async findOne(id: string): Promise<SpeakingPart> {
    const part = await this.speakingPartModel.findByPk(id, {
      include: [SpeakingTests]
    });
    if (!part) throw new NotFoundException('Speaking part not found');
    return part;
  }
  
  async findByTestId(testId: string): Promise<SpeakingPart[]> {
    return this.speakingPartModel.findAll({
      where: { test_id: testId },
      include: [SpeakingTests]
    });
  }

  async findByPartType(partType: "1.1" | "1.2" | "2" | "3"): Promise<SpeakingPart[]> {
    return this.speakingPartModel.findAll({
      where: { part: partType },
      include: [SpeakingTests]
    });
  }

  async update(id: string, updateDto: UpdateSpeakingPartDto): Promise<SpeakingPart> {
    const part = await this.findOne(id);
    await part.update(updateDto);
    return part;
  }

  async remove(id: string): Promise<void> {
    const part = await this.findOne(id);
    await part.destroy();
  }
}
