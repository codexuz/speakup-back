import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReadingPassageDto {
  @IsNotEmpty()
  @IsEnum(['part1', 'part2', 'part3', 'part4', 'part5'])
  part: string;

  @IsNotEmpty()
  @IsString()
  reading_text: string;

  @IsNotEmpty()
  @IsUUID()
  reading_id: string;
}
