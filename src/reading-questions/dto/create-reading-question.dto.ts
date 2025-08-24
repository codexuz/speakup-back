import { IsEnum, IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';

export class CreateReadingQuestionDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(['part1', 'part2', 'part3', 'part4', 'part5'])
  part: string;

  @IsNotEmpty()
  @IsUUID()
  reading_text_id: string;
}
