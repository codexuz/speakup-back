import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestsService } from './tests.service.js';
import { TestsController } from './tests.controller.js';
import { Test } from './entities/test.entity.js';

@Module({
  imports: [SequelizeModule.forFeature([Test])],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
