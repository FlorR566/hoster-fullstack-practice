import type { Request, Response } from "express"
import Unit from "../models/Unit"

export class UnitController {

    static createUnit = async (req: Request ,res: Response ) => {
        const {type, capacity, state, price} = req.body
        
        // Validar campos requeridos
        if (!type || !capacity || !state || !price) {
            return res.status(400).json({ 
                error: 'Faltan campos requeridos: type, capacity, state, price' 
            });
        }

        try {
            // Validar que type tenga un formato válido
            const unitExists = await Unit.findOne({where: {type}})
            if (unitExists) {
                const error = new Error('Una unidad con ese tipo ya está registrada')
                return res.status(409).json({error: error.message})
            }

            // Validar que capacity sea un número positivo
            const capacityNum = Number(capacity);
            if (capacityNum <= 0) {
                return res.status(400).json({error: 'La capacidad debe ser un número positivo'});
            }

            // Validar que price sea un número positivo
            const priceNum = Number(price);
            if (priceNum <= 0) {
                return res.status(400).json({error: 'El precio debe ser un número positivo'});
            }

            const newUnit = new Unit(req.body)
            await newUnit.save()
            res.status(201).json({message: 'Unidad Creada Correctamente', unit: newUnit})
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

