import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull} from "sequelize-typescript";

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
    declare type:string

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare days:number

    @AllowNull(false)
    @Column({
        type: DataType.FLOAT
    })
    declare price:number

    @AllowNull(false)
    @Column({
        type: DataType.FLOAT
    })
    declare total:number

    @AllowNull(false)
    @Column({
        type: DataType.STRING(15)
    })
    declare plate:string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare observations:string

}

export default Service