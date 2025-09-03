import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';

export class CreateSpeakingPartDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(['1.1', '1.2', '2', '3'])
  part: '1.1' | '1.2' | '2' | '3';

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  audio_url: string;

  @IsString()
  @IsNotEmpty()
  sample_answer: string;

  @IsUUID()
  test_id: string;
}
