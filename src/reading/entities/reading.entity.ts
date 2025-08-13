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

  @AllowNull(false)
  @Column(DataType.UUID)
  test_id!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
