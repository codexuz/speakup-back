import { PartialType } from '@nestjs/mapped-types';
import { CreateReadingDto } from './create-reading.dto.js';

export class UpdateReadingDto extends PartialType(CreateReadingDto) {}
