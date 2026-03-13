import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import Reserve from './Reserve'
import Service from './Service'

@Table({
    tableName: 'reserve_services'
})
class ReserveService extends Model{
    @ForeignKey(() => Reserve)
    @Column
    declare reserveId: number;

    @ForeignKey(() => Service)
    @Column
    declare serviceId: number;
}

export default ReserveService
