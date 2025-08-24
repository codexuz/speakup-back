import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "reading_questions",
  timestamps: false,
})
export class ReadingQuestion extends Model<ReadingQuestion> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @Column(DataType.ENUM('part1', 'part2', 'part3', 'part4', 'part5'))
  part!: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  reading_text_id!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
