import type { Request, Response } from "express"
import Reserve from "../models/Reserve"
import Unit from "../models/Unit"

export class ReserveController {

        static createReserve = async (req: Request ,res: Response ) => {
                const {night} = req.body, reserveExists = await Reserve.findOne({where: {night}})
                if (reserveExists) {
                    const error = new Error('Reserva ya Registrada')
                    return res.status(409).json({error: error.message})
                } 
                try { 
                    const newReserve = new Reserve(req.body)
                    // if(newReserve.units.length > 0 && newReserve.night > 0)
                    if(newReserve.night > 0)
                    await newReserve.save()
                    res.json({message: 'Reserva Creada Correctamente'})
                } catch (error) {
                    console.log(error)
                    res.status(500).json({error: 'Error al crear la Reserva'})
                }
        }

        static getAllReserves = async (req: Request ,res: Response ) => {
            try {
                const reserves = await Reserve.findAll()
                res.json(reserves)
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }

        static updateReserveById = async (req: Request ,res: Response ) => {
            const {id} = req.params
            try {
                const reserve = await Reserve.findByPk(id)
                if (!reserve) {
                    const error = new Error('Reserva no encontrada')
                    return res.status(404).json({error: error.message})
                }
                // reserve.units = req.body.units || reserve.units
                await reserve.update(req.body)
                res.json('Reserva actualizada correctamente')
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }

        static getReserveById = async (req: Request ,res: Response ) => {
            const {id} = req.params
            try {
                const reserve = await Reserve.findByPk(id)
                if (!reserve) {
                    const error = new Error('Reserva no encontrada')
                    return res.status(404).json({error: error.message})
                }
                res.json(reserve)
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }

        static deleteReserveById = async (req: Request ,res: Response ) => {
            const {id} = req.params
            try {
                const reserve = await Reserve.findByPk(id)
                if (!reserve) {
                    const error = new Error('Reserva no encontrada')
                    return res.status(404).json({error: error.message})
                }
                await reserve.destroy()
                res.json('Reserva eliminada correctamente')
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }
    
}
