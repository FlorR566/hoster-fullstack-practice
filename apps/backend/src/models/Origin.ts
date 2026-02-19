import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Reserve from './Reserve';

@Table({ 
    tableName: 'origins'
}) 
class Origin extends Model {

@AllowNull(false) 
@Column({
    type: DataType.STRING(50)
})
declare description:string; 

@ForeignKey(() => Reserve)
declare reserveId: number;

@BelongsTo(() => Reserve)
declare reserve: Reserve;
}

export default Origin;