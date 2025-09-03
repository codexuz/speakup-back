import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "reading_passages",
  timestamps: false,
})
export class ReadingPassages extends Model<ReadingPassages> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('part1', 'part2', 'part3', 'part4', 'part5'),
  })
  part!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  reading_text!: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  reading_id!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
