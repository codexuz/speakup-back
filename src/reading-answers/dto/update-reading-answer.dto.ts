import { PartialType } from '@nestjs/mapped-types';
import { CreateReadingAnswerDto } from './create-reading-answer.dto.js';

export class UpdateReadingAnswerDto extends PartialType(CreateReadingAnswerDto) {}
