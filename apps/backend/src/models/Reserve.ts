import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull} from 'sequelize-typescript'
import Unit from './Unit'
import Currency from './Currency'
import Guest from './Guest'
import Origin from './Origin'
import User from './User'

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
  
    @HasMany(() => Currency, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    currencies: Currency[]

    @HasMany(() => Guest, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    guests: Guest[]

    @HasMany(() => Origin, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    origins: Origin[]

    @HasMany(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    users: User[]

    @HasMany(() => Unit, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    units: Unit[]

}
export default Reserve