import type { Request, Response } from 'express';
import MaintenanceReport from '../models/MaintenanceReport';
import Unit from '../models/Unit';

export class MaintenanceReportController {
    static createMaintenanceReport = async (req: Request, res: Response) => {
        const { reserveId, type, unitId, responsibleName, estimatedDuration, date, startTime, description } = req.body;
        try {
            const unit = await Unit.findByPk(unitId);
            if (!unit) {
                return res.status(404).json({ error: 'Unidad no encontrada' });
            }

            const prefix = type === 'Mantenimiento' ? 'M' : type === 'Limpieza' ? 'L' : 'R';
            const count = await MaintenanceReport.count({ where: { type } });
            const nextNumber = count + 1;
            const reportId = `${prefix}${String(nextNumber).padStart(7, '0')}`;

            const maintenanceReport = await MaintenanceReport.create({
                reportId,
                type,
                unitId,
                responsibleName,
                estimatedDuration,
                date,
                startTime,
                description,
                reserveId: reserveId || null,
                status: 'Pendiente'
            })

            res.json(maintenanceReport);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al crear el reporte de mantenimiento', detail: error?.message });
        }
    }

    static getAllMaintenanceReports = async (req: Request, res: Response) => {
        try {
            const reports = await MaintenanceReport.findAll({
                include: [{ model: Unit }],
                order: [['createdAt', 'DESC']]
            });
            res.json(reports);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al obtener los reportes de mantenimiento', detail: error?.message })
        }
    }

    static getMaintenanceReportById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const report = await MaintenanceReport.findByPk(id, {
                include: [{ model: Unit }]
            });
            if (!report) {
                return res.status(404).json({ error: 'Reporte no encontrado' })
            }
            res.json(report);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al obtener el reporte de mantenimiento', detail: error?.message });
        }
    }

    static updateMaintenanceReportStatus = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const report = await MaintenanceReport.findByPk(id);
            if (!report) {
                return res.status(404).json({ error: 'Reporte no encontrado' });
            }
            if (status !== 'Pendiente' && status !== 'Completado') {
                return res.status(400).json({ error: 'Status inválido. Debe ser "Pendiente" o "Completado"' });
            }

            await report.update({ status });

            res.json({ message: 'Reporte actualizado correctamente', report });
        } catch (error: any) {
            res.status(500).json({ error: 'Error al actualizar el reporte', detail: error?.message });
        }
    }


}