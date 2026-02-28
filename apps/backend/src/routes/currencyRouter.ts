import { Router } from "express";
import { body, param } from "express-validator";
import { CurrencyController } from "../controllers/CurrencyController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-currency",
  body("name").notEmpty().withMessage("El nombre no puede estar vacío"),
  body("symbol")
    .notEmpty()
    .isLength({ max: 3 })
    .withMessage("El símbolo debe tener hasta 3 caracteres"),
  handleInputErrors,
  CurrencyController.createCurrency
);

router.get("/get-currencies", CurrencyController.getAllCurrency);

router.get(
  "/get-currency/:id",
  param("id").isInt(),
  handleInputErrors,
  CurrencyController.getCurrencyById
);

router.put(
  "/update-currency/:id",
  param("id").isInt(),
  handleInputErrors,
  CurrencyController.updateCurrencyById
);

router.delete(
  "/delete-currency/:id",
  param("id").isInt(),
  handleInputErrors,
  CurrencyController.deleteCurrencyById
);

export default router;