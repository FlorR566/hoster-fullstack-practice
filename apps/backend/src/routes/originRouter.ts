import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import Origin from "../models/Origin";

const router = Router();

router.post(
  "/create-origin",
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isLength({ max: 50 })
    .withMessage("Máximo 50 caracteres"),
  handleInputErrors,
  async (req, res) => {
    try {
      const origin = await Origin.create(req.body);
      res.json(origin); // devuelve id
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Error al crear el origen", detail: error?.message });
    }
  }
);

router.get("/get-origins", async (_req, res) => {
  try {
    const origins = await Origin.findAll();
    res.json(origins);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
});

router.get(
  "/get-origin/:id",
  param("id").isInt().withMessage("ID debe ser un entero"),
  handleInputErrors,
  async (req, res) => {
    try {
      const origin = await Origin.findByPk(req.params.id);
      if (!origin) return res.status(404).json({ error: "Origen no encontrado" });
      res.json(origin);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
);

export default router;