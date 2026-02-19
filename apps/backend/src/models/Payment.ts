import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo,ForeignKey} from 'sequelize-typescript'
import Method from './Method'

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

  @HasMany(() => Method, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  methods: Method[]
  
}

export default Payment;
