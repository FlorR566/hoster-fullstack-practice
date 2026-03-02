import { Router } from "express";
import { body, param } from "express-validator";
import { PaymentController } from "../controllers/PaymentController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-payment',
     body('date')
        .notEmpty().withMessage('La Fecha no puede estar vacia'),
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