import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { GuestController } from "../controllers/GuestController";

const router = Router();

router.post("/create-guest",
  body("name")
    .notEmpty().withMessage("El nombre no puede estar vacío"),
  body("numberDocument")
    .notEmpty().withMessage("El documento no puede estar vacío"),
  body("typeDocument")
    .notEmpty().withMessage("El tipo de documento no puede estar vacío"),
  body("country")
    .notEmpty().withMessage("El país no puede estar vacío"),
  body("email")
    .optional().isEmail().withMessage("Email inválido"),
  body("phone")
    .optional().isString(),
  handleInputErrors,
  GuestController.createGuest
);

router.get("/get-guests", 
    handleInputErrors,
    GuestController.getGuest
);

router.get("/get-guest/:id",
  param("id")
    .isInt().withMessage("ID debe ser un entero"),
  handleInputErrors,
  GuestController.getByIdGuest
);
export default router;