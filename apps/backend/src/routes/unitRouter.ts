import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { UnitController } from '../controllers/UnitController';

const router = Router();

router.post('/create-unit',
     body('type')
        .notEmpty().withMessage('El tipo de unidad no puede estar vacio'),
     body('amount')
        .notEmpty().withMessage('La cantidad de unidades no puede estar vacia'),
    handleInputErrors,
    UnitController.createUnit
)

router.get('/get-units',
    handleInputErrors,
    UnitController.getAllUnit
)

router.get('/get-unit/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    UnitController.getUnitById
)   

router.put('/update-unit/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    UnitController.updateUnit
)   

router.delete('/delete-unit/:id',
     param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    UnitController.deleteUnit
)
export default router;