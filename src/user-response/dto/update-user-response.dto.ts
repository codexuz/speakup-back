import { PartialType } from '@nestjs/mapped-types';
import { CreateUserResponseDto } from './create-user-response.dto.js';

export class UpdateUserResponseDto extends PartialType(CreateUserResponseDto) {}
