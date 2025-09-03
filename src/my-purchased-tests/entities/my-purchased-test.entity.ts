import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "my_purchased_tests",
  timestamps: false,
})
export class MyPurchasedTest extends Model<MyPurchasedTest> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  user_id!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("new", "completed"))
  status!: "new" | "completed";

  @AllowNull(true)
  @Column(DataType.UUID)
  test_id!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
