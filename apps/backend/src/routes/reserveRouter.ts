import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ReserveController } from "../controllers/ReserveController";
import { UnitController } from "../controllers/UnitController";
import { OriginController } from "../controllers/OriginController";

const router = Router()

router.post('/create-reserve',
     body('night')
        .notEmpty().withMessage('La cantidad de noches no puede estar vacia'),
     body('guestAdult')
        .notEmpty().withMessage('La cantidad de adultos no puede estar vacia'),
    //  body('guestChild')
    //     .notEmpty().withMessage('La cantidad de niños no puede estar vacia'),
    //  body('checkIn')
    //     .notEmpty().withMessage('La fecha de entrada no puede estar vacia'),
    //  body('checkOut') //deberia ir al put
        // .notEmpty().withMessage('La fecha de salida no puede estar vacia'),
     body('stayPrice')
        .notEmpty().withMessage('El precio de la estadia no puede estar vacio'),
     body('servicePrice')
        .notEmpty().withMessage('El precio del servicio no puede estar vacio'),
    //  body('observation')
    //     .notEmpty().withMessage('La observación no puede estar vacia'), tambien al put

    handleInputErrors,
    ReserveController.createReserve
)

router.get('/get-reserves',
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

// Rutas de Unit

router.post('/create-unit',
     body('type')
        .notEmpty().withMessage('El tipo de unidad no puede estar vacio'),
     body('amount')
        .notEmpty().withMessage('La cantidad de unidades no puede estar vacia'),
    handleInputErrors,
    UnitController.createUnit
)

// Rutas de Origin

router.post('/create-origin',
     body('description')
        .notEmpty().withMessage('La descripcion del Origen no puede estar vacia'),
    handleInputErrors,
    OriginController.createOrigin
)
router.get('/get-origin',
    handleInputErrors,
    OriginController.getAllOrigin
)
router.get('/get-origin/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    OriginController.getByIdOrigin
)
router.put('/update-origin',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    OriginController.createOrigin
)
router.delete('/delete-origin',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    OriginController.createOrigin
)

export default router