import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "tests",
  timestamps: false,
})
export class Test extends Model<Test> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(500),
  })
  title!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isPublished!: boolean;

  @AllowNull(true)
  @Column(DataType.ENUM("ielts", "cefr"))
  test_type!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
