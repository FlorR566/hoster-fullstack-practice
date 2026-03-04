import { Router } from "express";
import { body, param } from "express-validator";
import { MethodController } from "../controllers/MethodController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.get('/getAll-method',
    MethodController.getAllMethods
)

router.get('/get-method/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    MethodController.getMethodById
)

router.post('/create-method', 
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('symbol')
        .notEmpty().withMessage('El simbolo es obligatorio'),    
    handleInputErrors,
    MethodController.createMethod
)

router.put('/update-method/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    MethodController.updateMethodById
)

router.delete('/delete-method/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    MethodController.deleteMethodById
)
export default router