import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "reading_answers",
  timestamps: false,
})
export class ReadingAnswer extends Model<ReadingAnswer> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
  reading_answers!: string[];

  @AllowNull(false)
  @Column(DataType.UUID)
  reading_id!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
