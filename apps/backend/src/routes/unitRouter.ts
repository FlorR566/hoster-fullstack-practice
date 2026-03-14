import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { UnitController } from '../controllers/UnitController';
import Unit from '../models/Unit';
import { seedUnits } from '../controllers/seed';

const router = Router();

router.post('/create-unit',
    body('type')
        .notEmpty().withMessage('El tipo de unidad no puede estar vacio'),
    body('capacity')
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

router.delete("/debug/clear-units", async (req, res) => {
  try {
    await Unit.destroy({
      where: {},
      truncate: true,  
      cascade: true
    });

    res.json({ message: "Units eliminadas ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error borrando units" });
  }
});

router.post("/seed-units", seedUnits);

export default router;