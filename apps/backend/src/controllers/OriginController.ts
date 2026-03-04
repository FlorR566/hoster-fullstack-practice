import type { Request, Response } from "express"
import Origin from "../models/Origin"

export class OriginController {

    static createOrigin = async (req: Request ,res: Response ) => {
        const { description } = req.body, originExists = await Origin.findOne({where: {description}})
            if (originExists) {
                const error = new Error('Metodo de Pago ya Registrado')
                return res.status(409).json({error: error.message})
            } 
            try { 
                const newOrigin = new Origin(req.body)
                await newOrigin.save()
                res.json({message: 'Origen Creado Correctamente'})
            } catch (error) {
                res.status(500).json({error: 'Error al crear el Origen'})
            }
    }

    static getAllOrigin = async (req: Request ,res: Response ) => {
        try {
                const origins = await Origin.findAll()
                res.json(origins)
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
    }

    static getOriginById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const origin = await Origin.findByPk(id)
            if (!origin) {
                const error = new Error('Origen no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(origin)
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static updateOrigin = async (req: Request ,res: Response ) => {
        const { id } = req.params
        const { description } = req.body
        try {
            const origin = await Origin.findByPk(id)
            if (!origin) {
                const error = new Error('Origen no encontrado')
                return res.status(404).json({error: error.message})
            }
            await origin.update(req.body)
            res.json('Origen actualizado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
        
    }
    
    static deleteOrigin = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const origin = await Origin.findByPk(id)
            if (!origin) {
                const error = new Error('Origen no encontrado')
                return res.status(404).json({error: error.message})
            }
            await origin.destroy()
            res.json('Origen eliminado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }
}