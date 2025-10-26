import { IsUUID, IsEnum, IsOptional, IsNumber, IsPositive } from "class-validator";

export class CreateMyPurchasedTestDto {
  @IsUUID(4)
  user_id: string;

  @IsEnum(["new", "completed"])
  status: "new" | "completed";

  @IsUUID(4)
  @IsOptional()
  test_id?: string;

  @IsNumber()
  @IsPositive()
  cost: number;
}
