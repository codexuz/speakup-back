import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingAnswersService } from './reading-answers.service.js';
import { ReadingAnswersController } from './reading-answers.controller.js';
import { ReadingAnswer } from './entities/reading-answer.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([ReadingAnswer]),
    AuthModule
  ],
  controllers: [ReadingAnswersController],
  providers: [ReadingAnswersService],
  exports: [ReadingAnswersService]
})
export class ReadingAnswersModule {}
