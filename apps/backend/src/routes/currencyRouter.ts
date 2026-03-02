import { Router } from "express";
import { body, param } from "express-validator";
import { CurrencyController } from "../controllers/CurrencyController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post('/create-currency', 
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('symbol')
        .notEmpty().isLength({ max: 3 }).withMessage('El simbolo es obligatorio'),    
    handleInputErrors,
    CurrencyController.createCurrency
)

router.get('/getAll-currency',
    handleInputErrors,
    CurrencyController.getAllCurrency
)

router.get('/get-currency/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    CurrencyController.getCurrencyById
)

router.post('/create-currency',
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('symbol')
        .notEmpty().withMessage('El simbolo es obligatorio'),
    handleInputErrors,
    CurrencyController.createCurrency
)

router.put('/update-currency/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    CurrencyController.updateCurrencyById
)

router.delete('/delete-currency/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    CurrencyController.deleteCurrencyById
)
export default router;