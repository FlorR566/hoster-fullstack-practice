import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import { ReserveController } from "../controllers/ReserveController";

const router = Router()

// Aplicar autenticación a todas las rutas de reservas
router.use(authenticate)

router.post('/check-availability',
    body('unitId')
        .isInt().withMessage('unitId debe ser un número entero'),
    body('estimatedCheckIn')
        .notEmpty().withMessage('La fecha estimada de check-in es requerida'),
    body('estimatedCheckOut')
        .notEmpty().withMessage('La fecha estimada de check-out es requerida'),
    handleInputErrors,
    ReserveController.checkAvailability
)

router.post('/create-reserve',
    body('unitId')
        .isInt().withMessage('unitId debe ser un número entero'),
    body('guestId')
        .isInt().withMessage('guestId debe ser un número entero'),
    body('currencyId')
        .isInt().withMessage('currencyId debe ser un número entero'),
    body('originId')
        .isInt().withMessage('originId debe ser un número entero'),
    body('estimatedCheckIn')
        .notEmpty().withMessage('La fecha estimada de check-in es requerida'),
    body('estimatedCheckOut')
        .notEmpty().withMessage('La fecha estimada de check-out es requerida'),
    body('guestAdult')
        .notEmpty().withMessage('La cantidad de adultos es requerida'),
    handleInputErrors,
    ReserveController.createReserve
)

router.get('/get-reserves',
    handleInputErrors,
    ReserveController.getAllReserves
)

router.get('/get-reserve/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    ReserveController.getReserveById
)

router.put('/update-reserve/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    ReserveController.updateReserveById
)

router.post('/confirm-check-in',
    body('reserveId')
        .isInt().withMessage('reserveId debe ser un numero entero'),
    handleInputErrors,
    ReserveController.confirmCheckIn
)

router.post('/confirm-check-out',
    body('reserveId')
        .isInt().withMessage('reserveId debe ser un numero entero'),
    handleInputErrors,
    ReserveController.confirmCheckOut
)

router.delete('/delete-reserve/:id',
     param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    ReserveController.deleteReserveById
)
export default router