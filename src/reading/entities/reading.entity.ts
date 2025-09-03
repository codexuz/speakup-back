import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "reading",
  timestamps: false,
})
export class Reading extends Model<Reading> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(250),
  })
  title!: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  test_id!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @AllowNull(true)
  @Column(DataType.ENUM("ielts", "cefr"))
  reading_type!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
