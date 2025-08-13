import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service.js';
import { FileUploadDto } from './dto/file-upload.dto.js';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // or use dynamic path logic
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = this.uploadService.getFileUrl(file.filename);
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      url: fileUrl,
    };
  }

  @Get()
  async getAllFiles() {
    return this.uploadService.getAllFiles();
  }

  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    return this.uploadService.deleteFile(filename);
  }
}
