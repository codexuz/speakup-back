import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UploadService } from './upload.service.js';
import { UploadController } from './upload.controller.js';
import { Upload } from './entities/upload.entity.js';

@Module({
  imports: [SequelizeModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
