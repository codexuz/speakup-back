import { IsEnum, IsNotEmpty, IsObject, IsUUID } from 'class-validator';

export class CreateReadingQuestionDto {
  @IsNotEmpty()
  @IsObject()
  content: object;

  @IsNotEmpty()
  @IsEnum(['part1', 'part2', 'part3', 'part4', 'part5'])
  part: string;

  @IsNotEmpty()
  @IsUUID()
  reading_text_id: string;
}
