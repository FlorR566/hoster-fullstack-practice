import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ReserveController } from "../controllers/ReserveController";

const router = Router()

/* TODO: Tenemos que verificar que se necesita para crear una reserva, colocar en el put la actualizacion
de la reserva con el check in y check out.
TENEMOS QUE COORDINAR CON FRONT PARA VER QUE MAS VA EN UNA RESERVA Y COMO LO HACEN FUNCIONAR ELLOS.
*/

router.post('/create-reserve',
    body('night')
        .notEmpty().withMessage('La cantidad de noches no puede estar vacia'),
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

router.delete('/delete-reserve/:id',
     param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    ReserveController.deleteReserveById
)
export default router