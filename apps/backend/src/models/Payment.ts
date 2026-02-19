import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo,ForeignKey} from 'sequelize-typescript'
import Method from './Method'
import Currency from './Currency'

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
    type: DataType.DECIMAL(10, 2)
  })
  declare partialAmount: number

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2)
  })
  declare totalAmount: number

  @Column({
    type: DataType.DECIMAL(10, 2)
  })
  declare outstandingAmount: number

  @HasMany(() => Method, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  methods: Method[]

  @HasMany(() => Currency, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  currencies: Currency[]

}

export default Payment;
