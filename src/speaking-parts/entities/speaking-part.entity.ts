import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "speaking_parts",
  timestamps: false,
})
export class SpeakingPart extends Model<SpeakingPart> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  question!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("1.1", "1.2", "2", "3"))
  part!: "1.1" | "1.2" | "2" | "3";

  @AllowNull(true)
  @Column(DataType.TEXT)
  image_url!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  audio_url!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  sample_answer!: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  test_id!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
