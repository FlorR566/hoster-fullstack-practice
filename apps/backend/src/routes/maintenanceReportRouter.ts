import { Router } from 'express';
import { body, param } from 'express-validator';
import { MaintenanceReportController } from '../controllers/MaintenanceReportController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.post('/create-maintenance-report',
    body('type')
        .notEmpty().withMessage('El tipo de reporte no puede estar vacío'),
    body('unitId')
        .notEmpty().withMessage('El ID de la unidad no puede estar vacío')
        .isInt().withMessage('El ID de la unidad debe ser un número entero'),
    body('responsibleName')
        .notEmpty().withMessage('El nombre del responsable no puede estar vacío'),
    body('estimatedDuration')
        .isInt().withMessage('La duración estimada debe ser un número entero'),
    body('date')
        .notEmpty().withMessage('La fecha no puede estar vacía')
        .matches(/^\d{1,2}\/\d{1,2}\/\d{4}$/).withMessage('La fecha debe estar en formato DD/MM/YYYY'),
    body('startTime')
        .notEmpty().withMessage('La hora de inicio no puede estar vacía')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('La hora debe estar en formato HH:MM'),
    body('description')
        .notEmpty().withMessage('La descripción no puede estar vacía'),
    handleInputErrors,
    MaintenanceReportController.createMaintenanceReport
);

router.get('/get-maintenance-reports',
    handleInputErrors,
    MaintenanceReportController.getAllMaintenanceReports
);

router.get('/get-maintenance-report/:id',
    param('id')
        .isInt().withMessage('ID debe ser un entero'),
    handleInputErrors,
    MaintenanceReportController.getMaintenanceReportById
);

router.put('/update-maintenance-report/:id',
    param('id')
        .isInt().withMessage('ID debe ser un entero'),
    body('status')
        .notEmpty().withMessage('El estado no puede estar vacío')
        .isIn(['Pendiente', 'Completado']).withMessage('El estado debe ser "Pendiente" o "Completado"'),
    handleInputErrors,
    MaintenanceReportController.updateMaintenanceReportStatus
);
export default router;