import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isPublished: boolean = false;
}
