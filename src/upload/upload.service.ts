import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { Upload } from './entities/upload.entity.js';
import { CreateUploadDto } from './dto/create-upload.dto.js';
import { UpdateUploadDto } from './dto/update-upload.dto.js';

@Injectable()
export class UploadService {
  private readonly uploadDir = './uploads';

  constructor(
    @InjectModel(Upload)
    private readonly uploadModel: typeof Upload,
    private configService: ConfigService
  ) {}

  getFileUrl(filename: string): string {
    const baseUrl = this.configService.get('APP_URL');
    return `${baseUrl}/uploads/${filename}`;
  }

  async create(createUploadDto: CreateUploadDto): Promise<Upload> {
    return await this.uploadModel.create({
      ...createUploadDto,
    });
  }

  async findAll(): Promise<Upload[]> {
    return await this.uploadModel.findAll({
      where: {
        deleted_at: null,
      },
      order: [['uploaded_at', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Upload> {
    const upload = await this.uploadModel.findOne({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!upload) {
      throw new NotFoundException(`Upload with ID ${id} not found`);
    }

    return upload;
  }

  async findByUserId(userId: string): Promise<Upload[]> {
    return await this.uploadModel.findAll({
      where: {
        uploaded_by: userId,
        deleted_at: null,
      },
      order: [['uploaded_at', 'DESC']],
    });
  }

  async findByType(uploadType: string): Promise<Upload[]> {
    return await this.uploadModel.findAll({
      where: {
        upload_type: uploadType,
        deleted_at: null,
      },
      order: [['uploaded_at', 'DESC']],
    });
  }

  async update(id: string, updateUploadDto: UpdateUploadDto): Promise<Upload> {
    const upload = await this.findOne(id);
    
    await upload.update(updateUploadDto);
    return upload;
  }

  async softDelete(id: string): Promise<void> {
    const upload = await this.findOne(id);
    
    await upload.update({
      deleted_at: new Date(),
    });
  }

  async getAllFiles() {
    const files = await readdir(this.uploadDir);
    return files.map(filename => ({
      filename,
      url: this.getFileUrl(filename)
    }));
  }

  async deleteFile(filename: string) {
    try {
      await unlink(join(this.uploadDir, filename));
      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  async hardDelete(id: string): Promise<void> {
    const upload = await this.findOne(id);
    
    // Delete physical file if it exists
    try {
      await unlink(upload.file_path);
    } catch (error) {
      // File might not exist physically, continue with database deletion
    }

    await upload.destroy();
  }
}
