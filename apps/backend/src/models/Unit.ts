import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull} from 'sequelize-typescript'

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
}

export default Unit