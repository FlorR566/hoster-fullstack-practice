import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, Table, Unique } from 'sequelize-typescript';
import Reserve from './Reserve';
import Unit from './Unit';

@Table({
    tableName: 'maintenanceReports'
})

class MaintenanceReport extends Model {
    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(20)
    })
    declare reportId: string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM('Mantenimiento', 'Limpieza', 'Reparación')
    })
    declare type: string;

    @ForeignKey(() => Unit)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare unitId: number;

    @BelongsTo(() => Unit)
    declare unit: Unit

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare responsibleName: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(20)
    })
    declare estimatedDuration: string;

    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    declare date: Date;

    @AllowNull(false)
    @Column({
        type: DataType.TIME
    })
    declare startTime: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    declare description: string;

    @Default('Pendiente')
    @Column({
        type: DataType.ENUM('Pendiente', 'Completado')
    })
    declare status: string;

    @AllowNull(true)
    @ForeignKey(() => Reserve)
    @Column({
        type: DataType.INTEGER
    })
    declare reserveId: number;

    @BelongsTo(() => Reserve)
    declare reserve: Reserve;
}

export default MaintenanceReport