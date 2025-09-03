import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "files",
  timestamps: false,
})
export class File extends Model<File> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(true)
  @Column({
    type: DataType.JSONB,
  })
  s3Key!: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
  bucket!: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
  mime!: string;

  @AllowNull(true )
  @Column(DataType.TEXT)
  comment!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;
}
