import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
  Param,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service.js';
import { FileUploadDto } from './dto/file-upload.dto.js';
import { CreateUploadDto } from './dto/create-upload.dto.js';
import { UpdateUploadDto } from './dto/update-upload.dto.js';

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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() metadata?: any
  ) {
    const fileUrl = this.uploadService.getFileUrl(file.filename);
    
    // Save file information to database
    const createUploadDto: CreateUploadDto = {
      filename: file.filename,
      original_name: file.originalname,
      mime_type: file.mimetype,
      file_size: file.size,
      file_path: file.path,
      upload_type: this.getUploadType(file.mimetype),
      uploaded_by: metadata?.userId,
      description: metadata?.description,
    };

    const savedUpload = await this.uploadService.create(createUploadDto);

    return {
      id: savedUpload.id,
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      url: fileUrl,
      upload: savedUpload,
    };
  }

  private getUploadType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document';
    return 'other';
  }

  @Post('metadata')
  async createUpload(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  async findAll(@Query('type') type?: string, @Query('userId') userId?: string) {
    if (userId) {
      return this.uploadService.findByUserId(userId);
    }
    if (type) {
      return this.uploadService.findByType(type);
    }
    return this.uploadService.findAll();
  }

  @Get('files')
  async getAllFiles() {
    return this.uploadService.getAllFiles();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.uploadService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(id, updateUploadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.uploadService.softDelete(id);
  }

  @Delete(':id/hard')
  async hardDelete(@Param('id') id: string) {
    return this.uploadService.hardDelete(id);
  }

  @Delete('file/:filename')
  async deleteFile(@Param('filename') filename: string) {
    return this.uploadService.deleteFile(filename);
  }
}
