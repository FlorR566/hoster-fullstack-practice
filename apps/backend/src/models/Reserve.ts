import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull} from 'sequelize-typescript'
import Unit from './Unit'

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
  
//    @HasMany(() => Unit)
//   declare units: Unit[];
}
export default Reserve