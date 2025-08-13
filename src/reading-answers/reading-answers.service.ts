import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReadingAnswer } from './entities/reading-answer.entity.js';
import { CreateReadingAnswerDto } from './dto/create-reading-answer.dto.js';
import { UpdateReadingAnswerDto } from './dto/update-reading-answer.dto.js';

@Injectable()
export class ReadingAnswersService {
  constructor(
    @InjectModel(ReadingAnswer)
    private readonly readingAnswerModel: typeof ReadingAnswer,
  ) {}

  /**
   * Create a new reading answer
   */
  async create(createDto: CreateReadingAnswerDto): Promise<ReadingAnswer> {
    return this.readingAnswerModel.create(createDto);
  }

  /**
   * Find all reading answers
   */
  async findAll(): Promise<ReadingAnswer[]> {
    return this.readingAnswerModel.findAll();
  }

  /**
   * Find reading answers by reading ID
   */
  async findByReadingId(readingId: string): Promise<ReadingAnswer[]> {
    return this.readingAnswerModel.findAll({
      where: { reading_id: readingId }
    });
  }

  /**
   * Find reading answer by ID
   */
  async findOne(id: string): Promise<ReadingAnswer> {
    const answer = await this.readingAnswerModel.findByPk(id);
    if (!answer) {
      throw new NotFoundException(`Reading answer with ID ${id} not found`);
    }
    return answer;
  }

  /**
   * Update reading answer
   */
  async update(id: string, updateDto: UpdateReadingAnswerDto): Promise<ReadingAnswer> {
    const answer = await this.findOne(id);
    await answer.update(updateDto);
    return answer;
  }

  /**
   * Remove reading answer
   */
  async remove(id: string): Promise<void> {
    const answer = await this.findOne(id);
    await answer.destroy();
  }
}
