import Service from "../models/Service";
import { Request, Response } from "express";

export const seedServices = async (req: Request, res: Response) => {
  try {
    const services = [
      {
        name: "Parking",
        description: "Parking seguro para huéspedes.",
        days: 1,
        price: 120,
        total: 120,
        currencyId: 1,
      },
      {
        name: "Desayuno",
        description: "Desayuno buffet continental.",
        days: 1,
        price: 20,
        total: 20,
        currencyId: 1,
      },
      {
        name: "Lavandería",
        description: "Lavado, secado y planchado.",
        days: 1,
        price: 120,
        total: 120,
        currencyId: 1,
      },
      {
        name: "Sala de reuniones",
        description: "Sala equipada para reuniones.",
        days: 1,
        price: 120,
        total: 120,
        currencyId: 1,
      },
      {
        name: "Traslado Aeropuerto",
        description: "Traslado cómodo al aeropuerto.",
        days: 1,
        price: 120,
        total: 120,
        currencyId: 1,
      },
      {
        name: "Masajes",
        description: "Masajes relajantes para huéspedes.",
        days: 1,
        price: 120,
        total: 120,
        currencyId: 1,
      },
      {
        name: "Alquiler de bicicletas",
        description: "Bicicletas para recorrer la zona.",
        days: 1,
        price: 120,
        total: 120,
        currencyId: 1,
      },
      {
        name: "Tours",
        description: "Excursiones guiadas locales.",
        days: 1,
        price: 120,
        total: 120,
        currencyId: 1,
      },
    ];

    await Service.bulkCreate(services, {
      ignoreDuplicates: true,
    });

    res.json({ message: "Servicios creados ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando servicios" });
  }
};