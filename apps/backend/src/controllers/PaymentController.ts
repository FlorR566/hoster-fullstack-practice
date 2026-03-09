import type { Request, Response } from "express"
import Payment from "../models/Payment"

export class PaymentController {

    static createPayment = async (req: Request ,res: Response ) => {
        const {date, partialAmount, reserveId, methodId, currencyId} = req.body
        
        // Validar campos requeridos
        if (!date || !partialAmount || !reserveId || !methodId || !currencyId) {
            return res.status(400).json({ 
                error: 'Faltan campos requeridos: date, partialAmount, reserveId, methodId, currencyId' 
            });
        }

        try {
            // Validar que la reserva exista
            const Reserve = require('../models/Reserve').default;
            const reserve = await Reserve.findByPk(reserveId);
            if (!reserve) {
                return res.status(404).json({error: 'Reserva no encontrada'})
            }

            // Calcular monto total y cantidad pendiente
            const reserveTotalPrice = Number(reserve.totalPrice);
            const partialAmountNum = Number(partialAmount);
            
            // Obtener pagos previos para esta reserva
            const existingPayments = await Payment.findAll({where: {reserveId}});
            let totalPaidBefore = 0;
            existingPayments.forEach((p: any) => {
                if (p.partialAmount) {
                    totalPaidBefore += Number(p.partialAmount);
                }
            });

            const outstandingAmount = Math.max(0, reserveTotalPrice - totalPaidBefore - partialAmountNum);

            const newPayment = new Payment({
                date,
                partialAmount: partialAmountNum,
                totalAmount: reserveTotalPrice,
                outstandingAmount,
                reserveId,
                methodId,
                currencyId
            });
            
            await newPayment.save()
            res.status(201).json({message: 'Pago Creado Correctamente', payment: newPayment})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear el Pago'})
        }
    }

    static getAllPayments = async (req: Request ,res: Response ) => {
        try {
            const payments = await Payment.findAll()
            res.json(payments)
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static updatePaymentById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        const {name, symbol} = req.body
        try {
            const payment = await Payment.findByPk(id)
            if (!payment) {
                const error = new Error('Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            payment.date = req.body.date ? new Date(req.body.date) : payment.date
            await payment.update(req.body)
            res.json('Pago actualizado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static getPaymentById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const payment = await Payment.findByPk(id)
            if (!payment) {
                const error = new Error('Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(payment)
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static deletePaymentById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const payment = await Payment.findByPk(id)
            if (!payment) {
                const error = new Error('Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            await payment.destroy()
            res.json('Pago eliminado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }
}
