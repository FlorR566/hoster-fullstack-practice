import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript'

@Table({ 
    tableName: 'origins'
}) 
class Origin extends Model {

@AllowNull(false) 
@Column({
    type: DataType.STRING(50)
})
declare description:string; 
}

export default Origin;