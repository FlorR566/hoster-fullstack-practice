import { Router } from "express";
import { body, param } from "express-validator";
import { GuestController } from "../controllers/GuestController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-guest',
    body('name')
        .notEmpty().withMessage('El nombre del huesped no puede estar vacío'),
    body('numberDocument')
        .notEmpty().withMessage('El número de documento no puede estar vacío'),
    body('typeDocument')
        .notEmpty().withMessage('El tipo de documento no puede estar vacío'),
    body('email')
        .isEmail().withMessage('El email debe tener un formato válido'),
    body('phone')
        .notEmpty().withMessage('El teléfono no puede estar vacío'),
    body('country')
        .notEmpty().withMessage('El país no puede estar vacío'),
    handleInputErrors,
    GuestController.createGuest
)

router.get('/get-guests',
    handleInputErrors,
    GuestController.getAllGuest
)

router.get('/get-guest/:id',
    param('id')
        .isInt().withMessage('ID debe ser un número entero'),
    handleInputErrors,
    GuestController.getGuestById
)

/*router.put('/update-guest/:id',
    param('id')
        .isInt().withMessage('ID debe ser un número entero'),
    handleInputErrors,
    GuestController.updateGuest
)

router.delete('/delete-guest/:id',
    param('id')
        .isInt().withMessage('ID debe ser un número entero'),
    handleInputErrors,
    GuestController.deleteGuest
)*/
export default router