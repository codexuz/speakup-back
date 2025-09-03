import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserResponseDto {
  @IsNotEmpty()
  @IsArray()
  user_answers: string[];

  @IsNotEmpty()
  @IsUUID()
  reading_id: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
