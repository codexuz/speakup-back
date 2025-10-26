import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateUploadDto {
  @IsString()
  filename: string;

  @IsString()
  original_name: string;

  @IsString()
  mime_type: string;

  @IsNumber()
  file_size: number;

  @IsString()
  file_path: string;

  @IsOptional()
  @IsUUID(4)
  uploaded_by?: string;

  @IsOptional()
  @IsString()
  upload_type?: string;

  @IsOptional()
  @IsString()
  description?: string;
}