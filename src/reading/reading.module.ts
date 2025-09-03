import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingService } from './reading.service.js';
import { ReadingController } from './reading.controller.js';
import { Reading } from './entities/reading.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([Reading]),
    AuthModule
  ],
  controllers: [ReadingController],
  providers: [ReadingService],
  exports: [ReadingService]
})
export class ReadingModule {}
