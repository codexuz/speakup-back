import { IsUUID, IsEnum, IsOptional } from "class-validator";

export class CreateMyPurchasedTestDto {
  @IsUUID(4)
  user_id: string;

  @IsEnum(["new", "completed"])
  status: "new" | "completed";

  @IsUUID(4)
  @IsOptional()
  test_id?: string;
}
