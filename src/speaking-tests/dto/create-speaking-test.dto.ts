import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateSpeakingTestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
