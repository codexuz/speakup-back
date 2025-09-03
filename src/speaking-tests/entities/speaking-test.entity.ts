import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from 'sequelize-typescript';




@Table({
  tableName: 'speaking_tests',
  timestamps: false,
})
export class SpeakingTests extends Model<SpeakingTests> {
 @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    validate: {
      notEmpty: true,
    },
  })
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  created_at!: Date;

   @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  isActive: boolean;

}
