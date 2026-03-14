import { Request, Response } from "express";

// Models
import Service from "../models/Service";
import Unit from "../models/Unit";

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

export const seedUnits = async (req: Request, res: Response) => {
	try {
		const units = [
			// Habitaciones
			{
				id: 1,
				type: "Deluxe",
				description: "H01",
				capacity: 2,
				state: "Limpieza",
				price: 100,
			},
			{
				id: 2,
				type: "Deluxe",
				description: "H02",
				capacity: 2,
				state: "Disponible",
				price: 100,
			},
			{
				id: 3,
				type: "Deluxe",
				description: "H03",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 4,
				type: "Deluxe",
				description: "H04",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 5,
				type: "Deluxe",
				description: "H05",
				capacity: 2,
				state: "Disponible",
				price: 100,
			},
			{
				id: 6,
				type: "Estandar",
				description: "H06",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 7,
				type: "Estandar",
				description: "H07",
				capacity: 2,
				state: "Disponible",
				price: 100,
			},
			{
				id: 8,
				type: "Estandar",
				description: "H08",
				capacity: 3,
				state: "Disponible",
				price: 100,
			},
			{
				id: 9,
				type: "Estandar",
				description: "H09",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 10,
				type: "Estandar",
				description: "H10",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 11,
				type: "Estandar",
				description: "H11",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 12,
				type: "Estandar",
				description: "H12",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 13,
				type: "Estandar",
				description: "H13",
				capacity: 3,
				state: "Disponible",
				price: 100,
			},
			{
				id: 14,
				type: "Estandar",
				description: "H14",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 15,
				type: "Estandar",
				description: "H15",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 16,
				type: "Estandar",
				description: "H16",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 17,
				type: "Estandar",
				description: "H17",
				capacity: 2,
				state: "Disponible",
				price: 100,
			},
			{
				id: 18,
				type: "Estandar",
				description: "H18",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},

			// Cabañas
			{
				id: 19,
				type: "Presidencial",
				description: "C01",
				capacity: 2,
				state: "Ocupada",
				price: 100,
			},
			{
				id: 20,
				type: "Estandar",
				description: "C02",
				capacity: 2,
				state: "Disponible",
				price: 100,
			},
			{
				id: 21,
				type: "Estandar",
				description: "C03",
				capacity: 3,
				state: "Disponible",
				price: 100,
			},
			{
				id: 22,
				type: "Estandar",
				description: "C04",
				capacity: 2,
				state: "Disponible",
				price: 100,
			},
			{
				id: 23,
				type: "Deluxe",
				description: "C05",
				capacity: 4,
				state: "Disponible",
				price: 100,
			},
			{
				id: 24,
				type: "Deluxe",
				description: "C06",
				capacity: 2,
				state: "Disponible",
				price: 100,
			},
		];

		await Unit.bulkCreate(units, {
			ignoreDuplicates: true, // 🔥 evita romper si ya existen
		});

		res.json({ message: "Units creadas correctamente ✅" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error creando units" });
	}
};
