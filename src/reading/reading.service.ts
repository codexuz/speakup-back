import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reading } from './entities/reading.entity.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { UpdateReadingDto } from './dto/update-reading.dto.js';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading)
    private readonly readingModel: typeof Reading,
  ) {}

  /**
   * Create a new reading passage
   */
  async create(createReadingDto: CreateReadingDto): Promise<Reading> {
    return this.readingModel.create(createReadingDto);
  }

  /**
   * Find all reading passages
   */
  async findAll(): Promise<Reading[]> {
    return this.readingModel.findAll();
  }

  /**
   * Find reading passages by test ID
   */
  async findByTestId(testId: string): Promise<Reading[]> {
    return this.readingModel.findAll({
      where: { test_id: testId }
    });
  }

  /**
   * Find active reading passages
   */
  async findActive(): Promise<Reading[]> {
    return this.readingModel.findAll({
      where: { isActive: true }
    });
  }

  /**
   * Find reading passage by ID
   */
  async findOne(id: string): Promise<Reading> {
    const reading = await this.readingModel.findByPk(id);
    if (!reading) {
      throw new NotFoundException(`Reading passage with ID ${id} not found`);
    }
    return reading;
  }

  /**
   * Update reading passage
   */
  async update(id: string, updateReadingDto: UpdateReadingDto): Promise<Reading> {
    const reading = await this.findOne(id);
    await reading.update(updateReadingDto);
    return reading;
  }

  /**
   * Remove reading passage
   */
  async remove(id: string): Promise<void> {
    const reading = await this.findOne(id);
    await reading.destroy();
  }
}
