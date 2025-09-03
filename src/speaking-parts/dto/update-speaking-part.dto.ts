import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeakingPartDto } from './create-speaking-part.dto.js';

export class UpdateSpeakingPartDto extends PartialType(CreateSpeakingPartDto) {}
