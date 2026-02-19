import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Payment from './Payment';

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
declare description: string; 

@ForeignKey(() => Payment)
declare paymentId: number;

@BelongsTo(() => Payment)
declare payment: Payment;

}

export default Method;
