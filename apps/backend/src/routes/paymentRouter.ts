import { Router } from "express";
import { body, param } from "express-validator";
import { CurrencyController } from "../controllers/CurrencyController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()


// Rutas para Currency

router.get('/getAll-currency',
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

// Rutas para Payment

router.post('/create-payment',
)
router.get('/get-payment',
)

router.get('/get-payment/:id',
)

router.put('/update-payment/:id',
)
router.delete('/delete-payment/:id',
)

// Rutas para Method
router.post('/create-method',
)
router.get('/get-method',
)
router.get('/get-method/:id',
)
router.put('/update-method/:id',
)
router.delete('/delete-method/:id',
)

export default router