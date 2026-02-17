import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo,ForeignKey} from "sequelize-typescript";

// import MedioPago from "./MedioPago";
// import Moneda from "./Moneda";

@Table({
  tableName: "payments"
})
class Payment extends Model {

  @AllowNull(false)
  @Column(DataType.DATE)
  declare date: Date;

  @Column(DataType.FLOAT)
  declare partialAmount: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare totalAmount: number;

  @Column(DataType.FLOAT)
  declare outstandingAmount: number;

  // @ForeignKey(() => MedioPago)
  // @Column(DataType.INTEGER)
  // declare medioPagoId: number;

  // @BelongsTo(() => MedioPago)
  // medioPago!: MedioPago;

  // @ForeignKey(() => Moneda)
  // @Column(DataType.INTEGER)
  // declare monedaId: number;

  // @BelongsTo(() => Moneda)
  // moneda!: Moneda;
}

export default Payment;
