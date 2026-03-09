import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull, BelongsTo, ForeignKey} from 'sequelize-typescript'
import Currency from './Currency'


@Table({
    tableName: 'services'
})

class Service extends Model{
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name:string
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare description:string
    
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare days:number

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare price:number

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare total:number

    @ForeignKey(() => Currency)
    declare currencyId: number;

    @BelongsTo(() => Currency)
    declare currency: Currency;
}
export default Service