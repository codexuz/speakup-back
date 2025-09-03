import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingQuestionsService } from './reading-questions.service.js';
import { ReadingQuestionsController } from './reading-questions.controller.js';
import { ReadingQuestion } from './entities/reading-question.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([ReadingQuestion]),
    AuthModule
  ],
  controllers: [ReadingQuestionsController],
  providers: [ReadingQuestionsService],
  exports: [ReadingQuestionsService]
})
export class ReadingQuestionsModule {}
