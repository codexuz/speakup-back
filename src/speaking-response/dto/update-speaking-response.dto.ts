import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeakingResponseDto } from './create-speaking-response.dto.js';

export class UpdateSpeakingResponseDto extends PartialType(CreateSpeakingResponseDto) {}
