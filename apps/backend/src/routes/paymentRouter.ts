import { Router } from "express";
import { body, param } from "express-validator";
import { PaymentController } from "../controllers/PaymentController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router()

// Aplicar autenticación a todas las rutas de pagos
router.use(authenticate)

router.post('/create-payment',
     body('date')
        .notEmpty().withMessage('La Fecha no puede estar vacia'),
     body('partialAmount')
        .isDecimal().withMessage('El monto parcial debe ser un número decimal'),
     body('reserveId')
        .isInt().withMessage('reserveId debe ser un número entero'),
     body('methodId')
        .isInt().withMessage('methodId debe ser un número entero'),
     body('currencyId')
        .isInt().withMessage('currencyId debe ser un número entero'),
    handleInputErrors,
    PaymentController.createPayment
)

router.get('/get-payment',
    handleInputErrors,
    PaymentController.getAllPayments
)

router.get('/get-payment/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    PaymentController.getPaymentById
)

router.put('/update-payment/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    PaymentController.updatePaymentById
)

router.delete('/delete-payment/:id',
     param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    PaymentController.deletePaymentById
)
export default router