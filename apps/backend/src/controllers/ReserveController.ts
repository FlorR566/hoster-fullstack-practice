import { format, isValid, parse } from 'date-fns'
import type { Request, Response } from "express"
import { Op } from "sequelize"
import Payment from "../models/Payment"
import Reserve from "../models/Reserve"
import ReserveService from "../models/ReserveService"
import Service from "../models/Service"
import Unit from "../models/Unit"

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

    static checkAvailability = async (req: Request, res: Response) => {

        const { unitId, estimatedCheckIn, estimatedCheckOut } = req.body;

        try {
            // Validar que todos los campos requeridos estén presentes
            if (!unitId || !estimatedCheckIn || !estimatedCheckOut) {
                return res.status(400).json({
                    error: 'Faltan campos requeridos: unitId, estimatedCheckIn, estimatedCheckOut'
                });
            }

            // Validar que la unidad exista
            const unit = await Unit.findByPk(unitId);
            if (!unit) {
                return res.status(404).json({ error: 'Unidad no encontrada' });
            }

            // Convertir y validar fechas
            let checkInDate: Date;
            let checkOutDate: Date;
            try {
                checkInDate = this.parseAndValidateDate(estimatedCheckIn);
                checkOutDate = this.parseAndValidateDate(estimatedCheckOut);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }

            // Buscar reservas conflictivas para esta unidad específica
            const overlappingReserves = await Reserve.findAll({
                where: {
                    unitId,
                    isCancelled: false,
                    [Op.or]: [
                        // Caso 1: Check-in solicitado cae dentro de una reserva existente
                        {
                            estimatedCheckIn: { [Op.lte]: checkInDate },
                            estimatedCheckOut: { [Op.gt]: checkInDate }
                        },

                        // Caso 2: Check-out solicitado cae dentro de una reserva existente
                        {
                            estimatedCheckIn: { [Op.lt]: checkOutDate },
                            estimatedCheckOut: { [Op.gte]: checkOutDate }
                        },

                        // Caso 3: Reserva existente envuelve completamente las fechas solicitadas
                        {
                            estimatedCheckIn: { [Op.lte]: checkInDate },
                            estimatedCheckOut: { [Op.gte]: checkOutDate }
                        }
                    ]
                }
            });

            const isAvailable = overlappingReserves.length === 0;

            res.json({
                unitId,
                isAvailable,
                unit: isAvailable ? unit : null,
                conflictingReserves: !isAvailable ? overlappingReserves : []
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error al verificar la disponibilidad' });
        }
    }

    static createReserve = async (req: Request, res: Response) => {
        const {
            unitId,
            userId,
            numberDocument,
            currencyId,
            originId,
            name,
            typeDocument,
            country,
            serviceIds,
            estimatedCheckIn,
            estimatedCheckOut,
            estimatedCheckInTime,
            estimatedCheckOutTime,
            guestAdult,
            guestChild,
            email,
            phone,
            observation
        } = req.body;

        // Validar campos requeridos
        if (!unitId || !userId || !numberDocument || !currencyId || !originId || !estimatedCheckIn || !estimatedCheckOut || !estimatedCheckInTime || !estimatedCheckOutTime || !guestAdult) {
            return res.status(400).json({
                error: 'Faltan campos requeridos: unitId, userId, numberDocument, currencyId, originId, estimatedCheckIn, estimatedCheckOut, estimatedCheckInTime, estimatedCheckOutTime, guestAdult'
            });
        }

        try {
            // Validar que la unidad exista
            const unit = await Unit.findByPk(unitId);
            if (!unit) {
                return res.status(404).json({ error: 'Unidad no encontrada' });
            }

            // Validar que el guest exista
            const Guest = require('../models/Guest').default;
            let guest = await Guest.findOne({ where: { numberDocument } });
            if (!guest) {
                if (!name || !typeDocument || !numberDocument || !country) {
                    return res.status(400).json({ error: 'Huésped no encontrado' });
                }
                guest = await Guest.create({ name, typeDocument, numberDocument, country, email: email || null, phone: phone || null });

            }

            // Validar que la moneda exista
            const Currency = require('../models/Currency').default;
            const currency = await Currency.findByPk(currencyId);
            if (!currency) {
                return res.status(404).json({ error: 'Moneda no encontrada' });
            }

            // Validar que el origen exista
            const Origin = require('../models/Origin').default;
            const origin = await Origin.findByPk(originId);
            if (!origin) {
                return res.status(404).json({ error: 'Origen no encontrado' });
            }

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

            // Calcular stayPrice
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
                guestId: guest.id,
                currencyId,
                originId,
                estimatedCheckIn: format(checkInDate, 'yyyy-MM-dd'),
                estimatedCheckOut: format(checkOutDate, 'yyyy-MM-dd'),
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

            // Recargar la reserva con sus servicios y guest asociados
            const reserveWithServicesAndGuest = await Reserve.findByPk(newReserve.id, {
                include: [
                    { model: Service, attributes: ['id', 'name', 'price'] },
                    { model: Guest, attributes: ['id', 'name', 'email', 'phone', 'numberDocument'] }
                ]
            });

            res.status(201).json(this.formatReserve(reserveWithServicesAndGuest));
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static getAllReserves = async (req: Request, res: Response) => {
        try {
            const reserves = await Reserve.findAll({
                where: {
                    isCancelled: false
                }
            })
            res.json(reserves.map(reserve => this.formatReserve(reserve)))
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }

    static confirmCheckIn = async (req: Request, res: Response) => {
        const { reserveId } = req.body;

        try {
            const reserve = await Reserve.findByPk(reserveId);
            if (!reserve) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }

            // Actualizar check-in sin validar check-out
            await reserve.update({
                checkIn: new Date(),
                checkInConfirmed: true,
                checkInConfirmedAt: new Date()
            });

            res.status(200).json({
                message: 'Check-in confirmado correctamente',
                reserve: this.formatReserve(reserve)
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al confirmar check-in' });
        }
    }

    static confirmCheckOut = async (req: Request, res: Response) => {
        const { reserveId } = req.body;

        try {
            const reserve = await Reserve.findByPk(reserveId);
            if (!reserve) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }

            // Validar que check-in esté confirmado
            if (!reserve.checkInConfirmed) {
                return res.status(400).json({ error: 'El check-in debe estar confirmado antes de hacer check-out' });
            }

            // Validar que no esté ya confirmado
            if (reserve.checkOutConfirmed) {
                return res.status(400).json({ error: 'El check-out ya fue confirmado anteriormente' });
            }

            // Actualizar check-out
            await reserve.update({
                checkOut: new Date(),
                checkOutConfirmed: true,
                checkOutConfirmedAt: new Date()
            });

            // Calcular información de pagos (saldo)
            const paymentInfo = await this.calculatePaymentBalance(reserve);

            res.status(200).json({
                message: 'Check-out confirmado correctamente',
                reserve: this.formatReserve(reserve),
                paymentInfo
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al confirmar check-out' });
        }
    }

    private static calculatePaymentBalance = async (reserve: Reserve): Promise<any> => {
        try {
            // Obtener todos los pagos relacionados a esta reserva
            const payments = await Payment.findAll({
                where: {
                    reserveId: reserve.id
                }
            });

            // Calcular total pagado
            let totalPaid = 0;
            payments.forEach((payment: any) => {
                if (payment.partialAmount) {
                    totalPaid += Number(payment.partialAmount);
                }
            });

            // Calcular saldo pendiente
            const totalPrice = Number(reserve.totalPrice);
            const outstandingAmount = totalPrice - totalPaid;
            const isPaid = outstandingAmount <= 0;

            return {
                totalPrice,
                totalPaid,
                outstandingAmount: Math.max(0, outstandingAmount),
                isPaid,
                paymentStatus: isPaid ? 'complete' : 'partial',
                paymentCount: payments.length,
                lastPaymentDate: payments.length > 0
                    ? payments[payments.length - 1].date
                    : null
            };
        } catch (error) {
            console.error('Error calculating payment balance:', error);
            return null;
        }
    }

    static updateReserveById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const reserve = await Reserve.findByPk(id);
            if (!reserve) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }

            // Validar que no esté confirmada
            if (reserve.checkInConfirmed || reserve.checkOutConfirmed) {
                return res.status(400).json({
                    error: 'No se puede actualizar una reserva que ya ha sido confirmada'
                });
            }

            // Validar y convertir fechas si vienen en el body
            const updateData = { ...req.body };
            let checkInDate: Date | null = null;
            let checkOutDate: Date | null = null;

            if (req.body.estimatedCheckIn) {
                try {
                    checkInDate = this.parseAndValidateDate(req.body.estimatedCheckIn);
                    updateData.estimatedCheckIn = format(checkInDate, 'yyyy-MM-dd');
                } catch (error) {
                    return res.status(400).json({ error: error.message });
                }
            }
            if (req.body.estimatedCheckOut) {
                try {
                    checkOutDate = this.parseAndValidateDate(req.body.estimatedCheckOut);
                    updateData.estimatedCheckOut = format(checkOutDate, 'yyyy-MM-dd');
                } catch (error) {
                    return res.status(400).json({ error: error.message });
                }
            }

            // Validar que las fechas convertidas sean válidas
            if (checkInDate && !isValid(checkInDate)) {
                return res.status(400).json({ error: 'La fecha de check-in estimado no es válida' });
            }
            if (checkOutDate && !isValid(checkOutDate)) {
                return res.status(400).json({ error: 'La fecha de check-out estimado no es válida' });
            }

            // Si ambas fechas se actualizan, validar que checkOut sea posterior a checkIn
            if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
                return res.status(400).json({ error: 'La fecha de check-out debe ser posterior a la fecha de check-in' });
            }

            // Recalcular noches y precios solo si las fechas fueron actualizadas
            if (checkInDate && checkOutDate) {
                const newNight = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
                const oldNight = reserve.night;
                updateData.night = newNight;

                // Obtener precio diario de la unidad y servicios
                const unit = await Unit.findByPk(reserve.unitId);
                if (unit) {
                    const dailyStayPrice = Number(unit.price);
                    updateData.stayPrice = dailyStayPrice * newNight;
                }

                // Recalcular servicePrice si hay servicios asociados
                const reserveServices = await ReserveService.findAll({
                    where: { reserveId: reserve.id }
                });

                if (reserveServices.length > 0) {
                    let newServicePrice = 0;
                    for (const rs of reserveServices) {
                        const service = await Service.findByPk(rs.serviceId);
                        if (service) {
                            newServicePrice += Number(service.price) * newNight;
                        }
                    }
                    updateData.servicePrice = newServicePrice;
                }

                // Calcular totalPrice con los nuevos precios
                const finalStayPrice = updateData.stayPrice ?? (unit ? Number(unit.price) * newNight : 0);
                const finalServicePrice = updateData.servicePrice ?? 0;
                updateData.totalPrice = finalStayPrice + finalServicePrice;
            }

            await reserve.update(updateData);

            res.json({
                message: 'Reserva actualizada correctamente',
                reserve: this.formatReserve(reserve)
            });
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static getReserveById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const reserve = await Reserve.findByPk(id)
            if (!reserve) {
                const error = new Error('Reserva no encontrada')
                return res.status(404).json({ error: error.message })
            }
            res.json(this.formatReserve(reserve))
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }

    static deleteReserveById = async (req: Request, res: Response) => {
        // Cancelación lógica: no se elimina el registro, solo se marca como cancelado
        const { id } = req.params
        try {
            const reserve = await Reserve.findByPk(id)
            if (!reserve) {
                const error = new Error('Reserva no encontrada')
                return res.status(404).json({ error: error.message })
            }

            // Marcar como cancelada en lugar de eliminar
            await reserve.update({
                isCancelled: true,
                cancelledAt: new Date()
            })
            res.json({
                message: 'Reserva cancelada correctamente',
                reserve: this.formatReserve(reserve)
            })
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }
}
