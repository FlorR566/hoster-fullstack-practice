import type { Request, Response } from "express"
import { Op } from "sequelize"
import Reserve from "../models/Reserve"
import Unit from "../models/Unit"
import Service from "../models/Service"
import { ReserveService } from "../models/Reserve"
import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

export class ReserveController {

    // Helper para parsear y validar fechas en formato dd-MM-yyyy
    private static parseAndValidateDate(dateString: string): Date {
        const parsed = parse(dateString, 'dd-MM-yyyy', new Date());
        if (!isValid(parsed)) {
            throw new Error(`Formato de fecha inválido. Use dd-MM-yyyy (ej: 06-03-2026)`);
        }
        return parsed;
    }

    // Helper para formatear fechas en las respuestas
    private static formatReserve(reserve: any) {
        const formatted = reserve.toJSON ? reserve.toJSON() : reserve;
        return {
            ...formatted,
            estimatedCheckIn: formatted.estimatedCheckIn 
                ? format(new Date(formatted.estimatedCheckIn), 'dd-MM-yyyy')
                : null,
            estimatedCheckOut: formatted.estimatedCheckOut 
                ? format(new Date(formatted.estimatedCheckOut), 'dd-MM-yyyy')
                : null,
            estimatedCheckInTime: formatted.estimatedCheckInTime || null,
            estimatedCheckOutTime: formatted.estimatedCheckOutTime || null
        };
    }

    //TODO: filtro de fechas para ver mas de las reservas.

    static checkAvailability = async (req: Request, res: Response) => {

        const { estimatedCheckIn, estimatedCheckOut } = req.body;

        try {
            const overlappingReserves = await Reserve.findAll({
                where: {
                    [Op.or]: [
                        // Caso 1: Check-in solicitado cae dentro de una reserva existente
                        { estimatedCheckIn: { [Op.between]: [estimatedCheckIn, estimatedCheckOut] } },
                        
                        // Caso 2: Check-out solicitado cae dentro de una reserva existente
                        { estimatedCheckOut: { [Op.between]: [estimatedCheckIn, estimatedCheckOut] } },
                        
                        // Caso 3: Reserva existente envuelve completamente las fechas solicitadas
                        {
                            estimatedCheckIn: { [Op.lte]: estimatedCheckIn },
                            estimatedCheckOut: { [Op.gte]: estimatedCheckOut }
                        }
                    ]
                }
            });
            const availableUnits = await Unit.findAll({
                where: {
                    id: {
                        [Op.notIn]: overlappingReserves.map(reserve => reserve.unitId)
                    }
                }
            });
            res.json(availableUnits);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al verificar la disponibilidad' });
        }
    }

    static createReserve = async (req: Request ,res: Response ) => {
        const {
            unitId,
            userId,
            serviceIds,
            estimatedCheckIn,
            estimatedCheckOut,
            estimatedCheckInTime,
            estimatedCheckOutTime,
            guestAdult,
            guestChild,
            observation
        } = req.body;

        // Validar campos requeridos
        if (!unitId || !userId || !estimatedCheckIn || !estimatedCheckOut || !estimatedCheckInTime || !estimatedCheckOutTime || !guestAdult || !guestChild) {
            return res.status(400).json({ 
                error: 'Faltan campos requeridos: unitId, userId, estimatedCheckIn, estimatedCheckOut, estimatedCheckInTime, estimatedCheckOutTime, guestAdult, guestChild' 
            });
        }

        try {
            // Validar y convertir fechas de dd-MM-yyyy a formato ISO
            let checkInDate: Date;
            let checkOutDate: Date;
            try {
                checkInDate = this.parseAndValidateDate(estimatedCheckIn);
                checkOutDate = this.parseAndValidateDate(estimatedCheckOut);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }

            // Validar que las fechas sean válidas
            if (!isValid(checkInDate) || !isValid(checkOutDate)) {
                return res.status(400).json({ error: 'Las fechas no son válidas' });
            }

            // Validar que checkOut sea posterior a checkIn
            if (checkOutDate <= checkInDate) {
                return res.status(400).json({ error: 'La fecha de check-out debe ser posterior a la fecha de check-in' });
            }

            // Calcular noches con las fechas convertidas
            const night = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

            // Obtener unidad y calcular stayPrice
            const unit = await Unit.findByPk(unitId);
            if (!unit) {
                return res.status(404).json({ error: 'Unidad no encontrada' });
            }

            const stayPrice = Number(unit.price) * night;

            // Calcular servicePrice si hay serviceIds (puede ser array)
            let servicePrice = 0;
            let validServiceIds: number[] = [];

            if (serviceIds && Array.isArray(serviceIds) && serviceIds.length > 0) {
                for (const id of serviceIds) {
                    const service = await Service.findByPk(id);
                    if (!service) {
                        return res.status(404).json({ error: `Servicio con ID ${id} no encontrado` });
                    }
                    servicePrice += Number(service.price) * night;
                    validServiceIds.push(id);
                }
            }

            // Calcular totalPrice
            const totalPrice = stayPrice + servicePrice;

            // Crear la reserva
            const newReserve = await Reserve.create({
                unitId,
                userId,
                estimatedCheckIn: format(checkInDate, 'dd-MM-yyyy'),
                estimatedCheckOut: format(checkOutDate, 'dd-MM-yyyy'),
                estimatedCheckInTime,
                estimatedCheckOutTime,
                guestAdult,
                guestChild: guestChild || '0',
                night,
                stayPrice,
                servicePrice,
                totalPrice,
                observation: observation || null
            });

            // Asociar servicios a la reserva si existen
            if (validServiceIds.length > 0) {
                await ReserveService.bulkCreate(
                    validServiceIds.map(serviceId => ({
                        reserveId: newReserve.id,
                        serviceId
                    }))
                );
            }

            // Recargar la reserva con sus servicios asociados
            const reserveWithServices = await Reserve.findByPk(newReserve.id, {
                include: [{ model: Service, attributes: ['id', 'name', 'price'] }]
            });

            res.status(201).json(this.formatReserve(reserveWithServices));
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static getAllReserves = async (req: Request ,res: Response ) => {
        try {
            const reserves = await Reserve.findAll()
            res.json(reserves.map(reserve => this.formatReserve(reserve)))
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static updateReserveById = async (req: Request, res: Response) => {

        // TODO: CheckIn ChecHOut status,
        const { id } = req.params;
        try {
            const reserve = await Reserve.findByPk(id);
            if (!reserve) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }

            // Validar y convertir fechas si vienen en el body
            const updateData = { ...req.body };
            let checkInDate: Date | null = null;
            let checkOutDate: Date | null = null;

            if (req.body.checkIn) {
                try {
                    checkInDate = this.parseAndValidateDate(req.body.CheckIn);
                    updateData.CheckIn = format(checkInDate, 'dd-MM-yyyy');
                } catch (error) {
                    return res.status(400).json({ error: error.message });
                }
            }
            if (req.body.checkOut) {
                try {
                    checkOutDate = this.parseAndValidateDate(req.body.checkOut);
                    updateData.checkOut = format(checkOutDate, 'dd-MM-yyyy');
                } catch (error) {
                    return res.status(400).json({ error: error.message });
                }
            }

            // Validar que las fechas convertidas sean válidas
            if (checkInDate && !isValid(checkInDate)) {
                return res.status(400).json({ error: 'La fecha de check-in no es válida' });
            }
            if (checkOutDate && !isValid(checkOutDate)) {
                return res.status(400).json({ error: 'La fecha de check-out no es válida' });
            }

            // Si ambas fechas se actualizan, validar que checkOut sea posterior a checkIn
            if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
                return res.status(400).json({ error: 'La fecha de check-out debe ser posterior a la fecha de check-in' });
            }

            const stayPrice = Number(updateData.stayPrice ?? reserve.stayPrice);
            const servicePrice = Number(updateData.servicePrice ?? reserve.servicePrice);
            const night = Number(updateData.night ?? reserve.night);
            const totalPrice = (stayPrice + servicePrice) * night;
            await reserve.update({
                ...updateData,
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
            res.json(this.formatReserve(reserve))
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static deleteReserveById = async (req: Request ,res: Response ) => {
        // TODO: no es eliminado es cancelado logico.
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
