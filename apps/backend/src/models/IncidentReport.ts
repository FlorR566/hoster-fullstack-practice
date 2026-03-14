import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Reserve from './Reserve';
import User from './User';

@Table({ tableName: 'incidentReports' })
class IncidentReport extends Model {
  @AllowNull(false)
  @Column({ type: DataType.STRING(20), unique: true })
  declare incidentId: string;

  @ForeignKey(() => Reserve)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare reserveId: number;

  @BelongsTo(() => Reserve)
  declare reserve: Reserve;

  @AllowNull(false)
  @Column({ type: DataType.STRING(100) })
  declare guestName: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM('Overbooking', 'Equipamiento Roto', 'Fallo en servicios básicos', 'Queja de cliente', 'Otro') })
  declare incidentType: string;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  declare incidentDate: Date;

  @AllowNull(false)
  @Column({ type: DataType.TIME })
  declare incidentTime: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare receptionistId: number;

  @BelongsTo(() => User)
  declare receptionist: User;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare receivesCompensation: boolean;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare compensationDetail: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM('Pendiente', 'Resuelto'), defaultValue: 'Pendiente' })
  declare status: string;
}

export default IncidentReport;