import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo, ForeignKey, BelongsToMany} from 'sequelize-typescript'
import Unit from './Unit'
import Currency from './Currency'
import Guest from './Guest'
import Origin from './Origin'
import User from './User'
import Service from './Service'

@Table({
    tableName: 'reserves'
})
class Reserve extends Model{

    @Column({
        type: DataType.INTEGER
    })
    declare night: number

    @Column({
        type: DataType.STRING(10)
    })
    declare guestAdult: string

    @Column({
        type: DataType.STRING(10)
    })
    declare guestChild: string

    @Column({
        type: DataType.DATE
    })
    declare checkIn: Date

    @Column({
        type: DataType.DATE
    })
    declare checkOut: Date

    @Column({
        type: DataType.DATE
    })
    declare estimatedCheckIn: Date

    @Column({
        type: DataType.DATE
    })
    declare estimatedCheckOut: Date

    @Column({
        type: DataType.TIME
    })
    declare estimatedCheckInTime: string

    @Column({
        type: DataType.TIME
    })
    declare estimatedCheckOutTime: string

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare stayPrice: number

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare servicePrice: number

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare totalPrice: number

    @Column({
        type: DataType.STRING(20)
    })
    declare observation: string  
  
    @ForeignKey(() => Currency)
    declare currencyId: number;

    @BelongsTo(() => Currency)
    declare currency: Currency;
    
    @ForeignKey(() => Guest)
    declare guestId: number;

    @BelongsTo(() => Guest)
    declare guest: Guest;

    @ForeignKey(() => Origin)
    declare originId: number;

    @BelongsTo(() => Origin)
    declare origin: Origin;

    @BelongsToMany(() => Service, () => ReserveService)
    declare services: Service[];

    @ForeignKey(() => User)
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @ForeignKey(() => Unit)
    declare unitId: number;

    @BelongsTo(() => Unit)
    declare unit: Unit;
}

@Table({
    tableName: 'reserve_services'
})
class ReserveService extends Model{
    @ForeignKey(() => Reserve)
    @Column
    declare reserveId: number;

    @ForeignKey(() => Service)
    @Column
    declare serviceId: number;
}

export default Reserve
export { ReserveService }