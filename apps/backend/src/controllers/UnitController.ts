import type { Request, Response } from "express"
import Unit from "../models/Unit"

export class UnitController {

    static createUnit = async (req: Request ,res: Response ) => {
        const {type, amount, capacity, state, price} = req.body, unitExists = await Unit.findOne({where: {type}})
        if (unitExists) {
            const error = new Error('Unidad ya Registrada')
            return res.status(409).json({error: error.message})
        } 
        try { 
            const newUnit = new Unit(req.body)
            await newUnit.save()
            res.json({message: 'Unidad Creada Correctamente'})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear la Unidad'})
        }
    }

    static getAllUnit = async (req: Request ,res: Response ) => {
        try {
                const services = await Unit.findAll()
                res.json(services)
        } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
        }

    }

    static getUnitById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
                const service = await Unit.findByPk(id)
                if (!service) {
                    const error = new Error('Unidad no Encontrada')
                    return res.status(404).json({error: error.message})
                }
                res.json(service)
        } catch (error) {
                res.status(500).json({error: 'Error al obtener la Unidad'})
        }
    }

    static updateUnit = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const unit = await Unit.findByPk(id)
            if (!unit) {
                const error = new Error('Unidad no Encontrada')
                return res.status(404).json({error: error.message})
            }
            await unit.update(req.body)
            res.json({message: 'Unidad Actualizada Correctamente'})
        } catch (error) {
            res.status(500).json({error: 'Error al actualizar la Unidad'})
        }
    }

    static deleteUnit = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const unit = await Unit.findByPk(id)
            if (!unit) {
                const error = new Error('Unidad no Encontrada')
                return res.status(404).json({error: error.message})
            }
            await unit.destroy()
            res.json({message: 'Unidad Eliminada Correctamente'})
        } catch (error) {
            res.status(500).json({error: 'Error al eliminar la Unidad'})
        }   
    }
}

