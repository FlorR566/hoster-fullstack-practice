import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo, ForeignKey} from 'sequelize-typescript'
import Payment from './Payment'
import Service from './Service';
import Reserve from './Reserve';
@Table({
    tableName: 'currencies'
})

class Currency extends Model{
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare name:string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(3)
    })
    declare symbol:string

    @ForeignKey(() => Payment)
    declare paymentId: number;

    @BelongsTo(() => Payment)
    declare payment: Payment;

    @ForeignKey(() => Service)
    declare serviceId: number;

    @BelongsTo(() => Service)
    declare service: Service;

    @ForeignKey(() => Reserve)
    declare reserveId: number;

    @BelongsTo(() => Reserve)
    declare reserve: Reserve;
}

export default Currency