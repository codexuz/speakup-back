import { PartialType } from '@nestjs/mapped-types';
import { CreateMyPurchasedTestDto } from './create-my-purchased-test.dto.js';

export class UpdateMyPurchasedTestDto extends PartialType(CreateMyPurchasedTestDto) {}
