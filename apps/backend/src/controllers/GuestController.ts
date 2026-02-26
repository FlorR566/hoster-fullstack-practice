import type { Request, Response } from 'express';
import Guest from '../models/Guest';

export class GuestController {
    static createGuest = async (req: Request, res: Response) => {
        const { numberDocument } = req.body, guestExists = await Guest.findOne({ where: { numberDocument } })
        if (guestExists) {
            const error = new Error('Huesped ya Registrado')
            return res.status(409).json({ error: error.message })
        }
        try {
            const newGuest = new Guest(req.body)
            await newGuest.save()
            res.json({ message: 'Huesped Creado Correctamente' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear el Huesped' })
        }
    }

    static getAllGuests = async (req: Request, res: Response) => {
        try {
            const guests = await Guest.findAll()
            res.json(guests)
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los Huespedes' })
        }

    }

    static getGuestById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const guest = await Guest.findByPk(id)
            if (!guest) {
                const error = new Error('Huesped no encontrado')
                return res.status(404).json({ error: error.message })
            }
            res.json(guest)
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el Huesped' })
        }
    }

    static updateGuestById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const guest = await Guest.findByPk(id)
            if (!guest) {
                const error = new Error('Huesped no encontrado')
                return res.status(404).json({ error: error.message })
            }
            await guest.update(req.body)
            res.json({ message: 'Datos del Huesped actualizados correctamente' })

        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el los datos del Huesped' })
        }
    }

    static deleteGuestById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const guest = await Guest.findByPk(id)
            if (!guest) {
                const error = new Error('Huesped no encontrado')
                return res.status(404).json({ error: error.message })
            }
            await guest.destroy()
            res.json({ message: 'Huesped eliminado correctamente' })
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el Huesped' })
        }
    }

}