import { FormData, EconData } from "../types/reserva";

/* =====================================================
   NOCHES
===================================================== */

export function calcNights(checkin: string, checkout: string): string {
	if (!checkin || !checkout) return "";

	const start = new Date(checkin + "T00:00:00");
	const end = new Date(checkout + "T00:00:00");

	const diff = Math.round(
		(end.getTime() - start.getTime()) / 86400000
	);

	return diff > 0 ? String(diff) : "";
}

/* =====================================================
   TOTALES ECONÓMICOS
===================================================== */

export type ReservaTotals = {
	totalNoches: number;
	totalServicios: number;
	totalEstadia: number;
	saldoPendiente: number;
};

export function calcReservaTotals(
	form: FormData,
	econ: EconData
): ReservaTotals {
	const precioPorNoche = parseFloat(form.precioPorNoche) || 0;
	const noches = parseInt(form.cantidadNoches) || 0;

	const totalNoches = precioPorNoche * noches;

	const totalServicios = form.serviciosAgregados.reduce(
		(acc, s) => acc + (parseFloat(s.precio) || 0),
		0
	);

	const totalEstadia = totalNoches + totalServicios;

	const montoAbona = parseFloat(econ.montoAbona) || 0;

	const saldoPendiente =
		econ.estadoPago === "Total"
			? 0
			: Math.max(0, totalEstadia - montoAbona);

	return {
		totalNoches,
		totalServicios,
		totalEstadia,
		saldoPendiente,
	};
}