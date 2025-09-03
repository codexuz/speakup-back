import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SpeakingTests } from "./entities/speaking-test.entity.js";
import { CreateSpeakingTestDto } from "./dto/create-speaking-test.dto.js";
import { UpdateSpeakingTestDto } from "./dto/update-speaking-test.dto.js";
import { SpeakingPart } from "../speaking-parts/entities/speaking-part.entity.js";
import { SpeakingResponse } from "../speaking-response/entities/speaking-response.entity.js";

@Injectable()
export class SpeakingTestsService {
  constructor(
    @InjectModel(SpeakingTests)
    private speakingTestModel: typeof SpeakingTests
  ) {}

  async create(createDto: CreateSpeakingTestDto): Promise<SpeakingTests> {
    return this.speakingTestModel.create(createDto);
  }

  async findAll(): Promise<SpeakingTests[]> {
    return this.speakingTestModel.findAll();
  }

  async findOne(id: string): Promise<SpeakingTests> {
    const test = await this.speakingTestModel.findByPk(id, {
      include: [{ model: SpeakingPart, separate: true, order: [['created_at', 'ASC']] }],
    });
    if (!test) throw new NotFoundException("Speaking test not found");
    return test;
  }

  async findWithResponses(id: string): Promise<SpeakingTests> {
    const test = await this.speakingTestModel.findByPk(id, {
      include: [SpeakingPart, SpeakingResponse],
    });
    if (!test) throw new NotFoundException("Speaking test not found");
    return test;
  }

  async findByIsActive(isActive: boolean): Promise<SpeakingTests[]> {
    return this.speakingTestModel.findAll({
      where: { isActive },
      include: [SpeakingPart],
    });
  }

  async update(
    id: string,
    updateDto: UpdateSpeakingTestDto
  ): Promise<SpeakingTests> {
    const test = await this.findOne(id);
    await test.update(updateDto);
    return test;
  }

  async remove(id: string): Promise<void> {
    const test = await this.findOne(id);
    await test.destroy();
  }
}
