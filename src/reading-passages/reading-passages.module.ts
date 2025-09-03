import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingPassagesService } from './reading-passages.service.js';
import { ReadingPassagesController } from './reading-passages.controller.js';
import { ReadingPassages } from './entities/reading-passage.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([ReadingPassages]),
    AuthModule
  ],
  controllers: [ReadingPassagesController],
  providers: [ReadingPassagesService],
  exports: [ReadingPassagesService]
})
export class ReadingPassagesModule {}
