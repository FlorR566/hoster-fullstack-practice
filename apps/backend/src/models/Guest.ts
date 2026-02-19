import { Table, Column, Model, DataType, AllowNull, ForeignKey,BelongsTo } from 'sequelize-typescript'

@Table({ 
    tableName: 'guests' 
}) 
class Guest extends Model {

@AllowNull(false) 
@Column({
   type: DataType.STRING(80)
})
declare name: string;

@AllowNull(false) 
@Column({
    type: DataType.STRING(30)
}) 
declare numberDocument: string;

@AllowNull(false) 
@Column({
    type: DataType.STRING(30)
}) 
declare typeDocument: string;

@AllowNull(false) 
@Column({
    type: DataType.STRING(30)
}) 
declare country: string;

@Column({
    type: DataType.STRING(80)
}) 
declare email: string;

@Column({
    type: DataType.STRING(30)
}) 
declare phone: string; }

export default Guest;
