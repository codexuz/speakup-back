import { Module } from '@nestjs/common';
import { SpeakingPartsService } from './speaking-parts.service.js';
import { SpeakingPartsController } from './speaking-parts.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpeakingPart } from './entities/speaking-part.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([SpeakingPart]),
    AuthModule
  ],
  controllers: [SpeakingPartsController],
  providers: [SpeakingPartsService],
  exports: [SpeakingPartsService],
})
export class SpeakingPartsModule {}
