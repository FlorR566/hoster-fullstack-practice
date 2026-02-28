import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import Guest from "../models/Guest";

const router = Router();

// CREATE
router.post(
  "/create-guest",
  body("name").notEmpty().withMessage("El nombre no puede estar vacío"),
  body("numberDocument").notEmpty().withMessage("El documento no puede estar vacío"),
  body("typeDocument").notEmpty().withMessage("El tipo de documento no puede estar vacío"),
  body("country").notEmpty().withMessage("El país no puede estar vacío"),
  body("email").optional().isEmail().withMessage("Email inválido"),
  body("phone").optional().isString(),
  handleInputErrors,
  async (req, res) => {
    try {
      const guest = await Guest.create(req.body);
      res.json(guest); // devuelve el id para usarlo como guestId
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Error al crear el huésped", detail: error?.message });
    }
  }
);

// LIST
router.get("/get-guests", async (_req, res) => {
  try {
    const guests = await Guest.findAll();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
});

// GET BY ID
router.get(
  "/get-guest/:id",
  param("id").isInt().withMessage("ID debe ser un entero"),
  handleInputErrors,
  async (req, res) => {
    try {
      const guest = await Guest.findByPk(req.params.id);
      if (!guest) return res.status(404).json({ error: "Huésped no encontrado" });
      res.json(guest);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
);

export default router;