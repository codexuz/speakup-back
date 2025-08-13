import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "user_response",
  timestamps: false,
})
export class UserResponse extends Model<UserResponse> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
  user_answers!: string[];

  @AllowNull(false)
  @Column(DataType.UUID)
  reading_id!: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  user_id!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
