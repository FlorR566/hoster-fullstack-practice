import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo,ForeignKey} from 'sequelize-typescript'

@Table({
  tableName: "payments"
})
class Payment extends Model {

  @AllowNull(false)
  @Column({
    type: DataType.DATE
  })
  declare date: Date

  @Column({
    type: DataType.DECIMAL
  })
  declare partialAmount: number

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL
  })
  declare totalAmount: number

  @Column({
    type: DataType.DECIMAL
  })
  declare outstandingAmount: number
}

export default Payment;
