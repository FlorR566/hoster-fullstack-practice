import type { Request, Response } from "express"
import Guest from "../models/Guest";

export class GuestController {

    static createGuest = async (req: Request ,res: Response ) => {
        const { name, numberDocument, typeDocument, country, email, phone } = req.body
        try {
            const guest = await Guest.create(req.body);
            res.json(guest); // devuelve el id para usarlo como guestId
            
        } catch (error: any) {
            if(req.body.numberDocument) {
                const existingGuest = await Guest.findOne({ where: { numberDocument: req.body.numberDocument } });
                if (existingGuest) {
                    console.log(error);
                    return res.status(400).json({ error: "El documento ya está registrado" });
                }
            }
                res.status(500).json({ error: "Hubo un error" });
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

    static updateGuest = async (req: Request ,res: Response ) => {
        const {id} = req.params
        const {name, symbol} = req.body
        try {
            const guest = await Guest.findByPk(id)
            if (!guest) {
                const error = new Error('Huesped no encontrada')
                return res.status(404).json({error: error.message})
            }
            await guest.update(req.body)
            res.json('Huesped actualizado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    /*
    static deleteGuest = async (req: Request ,res: Response ) => {
    }
    */

}