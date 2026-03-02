import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { OriginController } from "../controllers/OriginController";

const router = Router();

router.post("/create-origin",
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isLength({ max: 50 })
    .withMessage("Máximo 50 caracteres"),
  handleInputErrors,
  OriginController.createOrigin
);

router.get("/get-origins",
    handleInputErrors,
    OriginController.getAllOrigin
);

router.get("/get-origin/:id",
  param("id")
    .isInt().withMessage("ID debe ser un entero"),
  handleInputErrors,
  OriginController.getOriginById
);

router.put("/update-origin/:id",
  param("id")
    .isInt().withMessage("ID debe ser un entero"),
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isLength({ max: 50 }),
    handleInputErrors,
    OriginController.updateOrigin
);
router.delete("/delete-origin/:id",
  param("id")
    .isInt().withMessage("ID debe ser un entero"),
  handleInputErrors,
  OriginController.deleteOrigin
);

export default router;