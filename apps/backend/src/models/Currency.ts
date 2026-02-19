import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull} from 'sequelize-typescript'

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
}

export default Currency