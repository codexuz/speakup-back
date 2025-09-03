import { PartialType } from '@nestjs/mapped-types';
import { CreateReadingQuestionDto } from './create-reading-question.dto.js';

export class UpdateReadingQuestionDto extends PartialType(CreateReadingQuestionDto) {}
