import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript'

@Table({ 
    tableName: 'methods'
}) 
class Method extends Model {

@AllowNull(false) 
@Column({
    type: DataType.STRING(50)

})
declare name: string;

@Column({
    type: DataType.STRING(100)
}) 
declare description: string; }

export default Method;
