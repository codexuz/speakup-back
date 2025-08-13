import { Module } from '@nestjs/common';
import { SpeakingTestsService } from './speaking-tests.service.js';
import { SpeakingTestsController } from './speaking-tests.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpeakingTests } from './entities/speaking-test.entity.js';
import { AuthModule } from '../auth/auth.module.js';
@Module({
  imports: [
    SequelizeModule.forFeature([SpeakingTests]),
    AuthModule
  ],
  controllers: [SpeakingTestsController],
  providers: [SpeakingTestsService],
})
export class SpeakingTestsModule {}
