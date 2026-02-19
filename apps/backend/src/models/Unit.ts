import { Table, Column, Model, DataType, AllowNull, ForeignKey} from 'sequelize-typescript'
import Reserve from './Reserve'

@Table({
    tableName: 'units'
})

class Unit extends Model{
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare type:string
    
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare amount:number

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare capacity:number

    @AllowNull(false)
    @Column({
        type: DataType.STRING(20)
    })
    declare state:string

    @AllowNull(false)
    @Column({
        type: DataType.FLOAT
    })
    declare price:number

    @ForeignKey(() => Reserve)
    declare reserveId: number;
}

export default Unit