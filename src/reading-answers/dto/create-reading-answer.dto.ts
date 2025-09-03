import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReadingAnswerDto {
  @IsNotEmpty()
  @IsArray()
  reading_answers: string[];

  @IsNotEmpty()
  @IsUUID()
  reading_id: string;
}
