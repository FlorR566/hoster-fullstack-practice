import type { Request, Response } from 'express';
import IncidentReport from '../models/IncidentReport';
import Reserve from '../models/Reserve';
import User from '../models/User';

export class IncidentReportController {
  static createIncidentReport = async (req: Request, res: Response) => {
    const {
      reserveId,
      guestName,
      incidentType,
      incidentDate,
      incidentTime,
      description,
      receptionistId,
      receivesCompensation,
      compensationDetail,
    } = req.body;

    try {
      const reserve = await Reserve.findByPk(reserveId);
      if (!reserve) return res.status(404).json({ error: 'Reserva no encontrada' });

      const receptionist = await User.findByPk(receptionistId);
      if (!receptionist) return res.status(404).json({ error: 'Recepcionista no encontrado' });

      // Generar ID único (ej: INC-0000001)
      const count = await IncidentReport.count();
      const incidentId = `INC${String(count + 1).padStart(7, '0')}`;

      const [day, month, year] = incidentDate.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      const incident = await IncidentReport.create({
        incidentId,
        reserveId,
        guestName,
        incidentType,
        incidentDate: formattedDate,
        incidentTime,
        description,
        receptionistId,
        receivesCompensation,
        compensationDetail: receivesCompensation ? compensationDetail : null,
        status: 'Pendiente',
      });

      res.status(201).json(incident);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al crear incidente', detail: error.message });
    }
  };

  static getAllIncidentReports = async (req: Request, res: Response) => {
    try {
      const incidents = await IncidentReport.findAll({
        include: [
          { model: Reserve, attributes: ['id'] },
          { model: User, as: 'receptionist', attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });
      res.json(incidents);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener incidentes' });
    }
  };
}