import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTestDto } from './dto/create-test.dto.js';
import { UpdateTestDto } from './dto/update-test.dto.js';
import { Test } from './entities/test.entity.js';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test)
    private testModel: typeof Test,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    return await this.testModel.create({
      title: createTestDto.title,
      description: createTestDto.description,
      isPublished: createTestDto.isPublished ?? false,
    });
  }

  async findAll(): Promise<Test[]> {
    return await this.testModel.findAll({
      order: [['created_at', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Test> {
    const test = await this.testModel.findByPk(id);
    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return test;
  }

  async update(id: string, updateTestDto: UpdateTestDto): Promise<Test> {
    const test = await this.findOne(id);
    
    await test.update({
      ...(updateTestDto.title && { title: updateTestDto.title }),
      ...(updateTestDto.description && { description: updateTestDto.description }),
      ...(updateTestDto.isPublished !== undefined && { isPublished: updateTestDto.isPublished }),
    });
    
    return test;
  }

  async remove(id: string): Promise<void> {
    const test = await this.findOne(id);
    await test.destroy();
  }

  async findPublished(): Promise<Test[]> {
    return await this.testModel.findAll({
      where: { isPublished: true },
      order: [['created_at', 'DESC']],
    });
  }
}
