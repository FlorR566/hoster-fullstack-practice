import type { Request, Response } from "express"
import Guest from "../models/Guest";

export class GuestController {

    static createGuest = async (req: Request ,res: Response ) => {
        const { name, numberDocument, typeDocument, country, email, phone } = req.body
        try {
            const guest = await Guest.create(req.body);
            res.json(guest); // devuelve el id para usarlo como guestId
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ error: "Error al crear el huésped", detail: error?.message });
        }
    }

    static getAllGuest = async (req: Request ,res: Response ) => {
        try {
            const guests = await Guest.findAll();
            res.json(guests);
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    }

    static getGuestById = async (req: Request ,res: Response ) => {
        try {
            const guest = await Guest.findByPk(req.params.id);
            if (!guest) return res.status(404).json({ error: "Huésped no encontrado" });
            res.json(guest);
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    }

    /*static updateGuest = async (req: Request ,res: Response ) => {
    }

    static deleteGuest = async (req: Request ,res: Response ) => {
    }
    */

}