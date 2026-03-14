import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { IncidentReportController } from '../controllers/IncidentReportController';

const router = Router();

router.post(
  '/create-incident',
  [
    body('reserveId').isInt().withMessage('reserveId debe ser entero'),
    body('guestName').notEmpty(),
    body('incidentType').isIn(['Overbooking', 'Equipamiento Roto', 'Fallo en servicios básicos', 'Queja de cliente', 'Otro']),
    body('incidentDate').matches(/^\d{1,2}\/\d{1,2}\/\d{4}$/),
    body('incidentTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('description').notEmpty(),
    body('receptionistId').isInt(),
    body('receivesCompensation').isBoolean(),
  ],
  handleInputErrors,
  IncidentReportController.createIncidentReport
);

router.get('/get-incidents', IncidentReportController.getAllIncidentReports);

export default router;