import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReadingPassages } from './entities/reading-passage.entity.js';
import { CreateReadingPassageDto } from './dto/create-reading-passage.dto.js';
import { UpdateReadingPassageDto } from './dto/update-reading-passage.dto.js';

@Injectable()
export class ReadingPassagesService {
  constructor(
    @InjectModel(ReadingPassages)
    private readonly readingPassagesModel: typeof ReadingPassages,
  ) {}

  /**
   * Create a new reading passage
   */
  async create(createDto: CreateReadingPassageDto): Promise<ReadingPassages> {
    return this.readingPassagesModel.create(createDto);
  }

  /**
   * Find all reading passages
   */
  async findAll(): Promise<ReadingPassages[]> {
    return this.readingPassagesModel.findAll();
  }

  /**
   * Find reading passages by reading ID
   */
  async findByReadingId(readingId: string): Promise<ReadingPassages[]> {
    return this.readingPassagesModel.findAll({
      where: { reading_id: readingId }
    });
  }

  /**
   * Find reading passages by part
   */
  async findByPart(part: string): Promise<ReadingPassages[]> {
    return this.readingPassagesModel.findAll({
      where: { part }
    });
  }

  /**
   * Find reading passage by ID
   */
  async findOne(id: string): Promise<ReadingPassages> {
    const passage = await this.readingPassagesModel.findByPk(id);
    if (!passage) {
      throw new NotFoundException(`Reading passage with ID ${id} not found`);
    }
    return passage;
  }

  /**
   * Update reading passage
   */
  async update(id: string, updateDto: UpdateReadingPassageDto): Promise<ReadingPassages> {
    const passage = await this.findOne(id);
    await passage.update(updateDto);
    return passage;
  }

  /**
   * Remove reading passage
   */
  async remove(id: string): Promise<void> {
    const passage = await this.findOne(id);
    await passage.destroy();
  }
}
