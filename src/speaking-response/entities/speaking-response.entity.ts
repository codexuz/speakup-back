import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "speaking_response",
  timestamps: false,
})
export class SpeakingResponse extends Model<SpeakingResponse> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  transcript!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  audio_url!: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
  response!: object;

  @AllowNull(false)
  @Column(DataType.UUID)
  user_id!: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  test_id!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
