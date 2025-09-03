import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReadingQuestion } from './entities/reading-question.entity.js';
import { CreateReadingQuestionDto } from './dto/create-reading-question.dto.js';
import { UpdateReadingQuestionDto } from './dto/update-reading-question.dto.js';

@Injectable()
export class ReadingQuestionsService {
  constructor(
    @InjectModel(ReadingQuestion)
    private readonly readingQuestionModel: typeof ReadingQuestion,
  ) {}

  /**
   * Create a new reading question
   */
  async create(createDto: CreateReadingQuestionDto): Promise<ReadingQuestion> {
    return this.readingQuestionModel.create(createDto);
  }

  /**
   * Find all reading questions
   */
  async findAll(): Promise<ReadingQuestion[]> {
    return this.readingQuestionModel.findAll();
  }

  /**
   * Find reading questions by reading text ID
   */
  async findByReadingTextId(readingTextId: string): Promise<ReadingQuestion[]> {
    return this.readingQuestionModel.findAll({
      where: { reading_text_id: readingTextId }
    });
  }

  /**
   * Find reading questions by part
   */
  async findByPart(part: string): Promise<ReadingQuestion[]> {
    return this.readingQuestionModel.findAll({
      where: { part }
    });
  }

  /**
   * Find reading question by ID
   */
  async findOne(id: string): Promise<ReadingQuestion> {
    const question = await this.readingQuestionModel.findByPk(id);
    if (!question) {
      throw new NotFoundException(`Reading question with ID ${id} not found`);
    }
    return question;
  }

  /**
   * Update reading question
   */
  async update(id: string, updateDto: UpdateReadingQuestionDto): Promise<ReadingQuestion> {
    const question = await this.findOne(id);
    await question.update(updateDto);
    return question;
  }

  /**
   * Remove reading question
   */
  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}
