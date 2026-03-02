import type { Request, Response } from "express"
import Reserve from "../models/Reserve"
import Unit from "../models/Unit"
import Service from "../models/Service"

export class ReserveController {

    static createReserve = async (req: Request ,res: Response ) => {
        const reserveExists = await Reserve.findByPk(req.body.id)
        if (reserveExists) {
            const error = new Error('Reserva ya Registrada')
            return res.status(409).json({error: error.message})
        } 
        try {
            const { guestAdult, guestChild, estimatedCheckIn, estimatedCheckOut } = req.body;

            // Validar que estimatedCheckIn y estimatedCheckOut estén presentes
            if (!estimatedCheckIn) {
                return res.status(400).json({ error: 'estimatedCheckIn es requerido' });
            }

            if (!estimatedCheckOut) {
                return res.status(400).json({ error: 'estimatedCheckOut es requerido' });
            }

            // Calcular night a partir de las fechas
            const checkInDate = new Date(estimatedCheckIn);
            const checkOutDate = new Date(estimatedCheckOut);
            const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
            const night = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (night <= 0) {
                return res.status(400).json({ error: 'La fecha de checkout debe ser posterior a la fecha de checkin' });
            }

            // Obtener todas las unidades disponibles en el rango de fechas
            const availableUnits = await Unit.findAll({
                include: [{
                    model: Reserve,
                    required: false,
                    where: {
                        estimatedCheckOut: {
                            [require('sequelize').Op.gt]: estimatedCheckIn
                        },
                        estimatedCheckIn: {
                            [require('sequelize').Op.lt]: estimatedCheckOut
                        }
                    }
                }],
                having: require('sequelize').sequelize.where(
                    require('sequelize').sequelize.fn('COUNT', require('sequelize').sequelize.col('Reserves.id')),
                    require('sequelize').Op.eq,
                    0
                ),
                group: ['Unit.id'],
                subQuery: false
            });

            if (availableUnits.length === 0) {
                return res.status(404).json({ message: 'No hay unidades disponibles en las fechas seleccionadas' });
            }

            // Validar que guestAdult y guestChild estén presentes en el body
            if (guestAdult === undefined || guestAdult === null) {
                return res.status(400).json({ error: 'guestAdult es requerido' });
            }
            
            if (guestChild === undefined || guestChild === null) {
                return res.status(400).json({ error: 'guestChild es requerido' });
            }

            // Retornar unidades disponibles
            res.status(200).json({
                message: 'Unidades disponibles',
                night,
                estimatedCheckIn,
                estimatedCheckOut,
                availableUnits
            });

            const { unitId, serviceId, ...otherData } = req.body;
            
            // Obtener la unidad para acceder al precio
            const unit = await Unit.findByPk(unitId);
            
            if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
            }
            
            // Calcular stayPrice
            const stayPrice = unit.price * night;
            
            // Obtener el servicio para acceder al precio
            const service = await Service.findByPk(serviceId);
            
            if (!service) {
            return res.status(404).json({ message: 'Service not found' });
            }
            
            // Calcular servicePrice
            const servicePrice = service.price * night;
            
            const totalPrice = stayPrice + servicePrice;

            // Crear la reserva con todos los datos
            const reserve = await Reserve.create({
                guestAdult,
                guestChild,
                unitId,
                serviceId,
                night,
                stayPrice,
                servicePrice,
                totalPrice,
                estimatedCheckIn,
                estimatedCheckOut,
                ...otherData
            });

            return res.status(201).json(reserve);
        } catch (error) {
            return res.status(500).json({ message: error.message });
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

    static updateReserveById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const reserve = await Reserve.findByPk(id);
            if (!reserve) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }
            const stayPrice = Number(req.body.stayPrice ?? reserve.stayPrice);
            const servicePrice = Number(req.body.servicePrice ?? reserve.servicePrice);
            const night = Number(req.body.night ?? reserve.night);
            const totalPrice = (stayPrice + servicePrice) * night;
            await reserve.update({
                ...req.body,
                totalPrice
            });
            res.json('Reserva actualizada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
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
