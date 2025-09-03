import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';

export class CreateSpeakingResponseDto {
  
  @IsString()
  @IsNotEmpty()
  audio_url: string;

  @IsUUID()
  user_id: string;

  @IsUUID()
  test_id: string;
}
