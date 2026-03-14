import React from "react";
import { Calendar, DollarSign, Car } from "lucide-react";
import { FormData } from "../../../types/reserva";
import { formatDate } from "../../../utils/date/formatDateToYmd";
import { calcNights } from "../../../utils/reserve";

type Props = {
	form: FormData;
	ConfirmRow: React.ComponentType<{
		icon?: React.ReactNode;
		label: string;
		value: string;
	}>;
};

const ServiciosConfirmacion: React.FC<Props> = ({
	form,
	ConfirmRow,
}) => {

	const noches = Number(
		calcNights(form.fechaCheckin, form.fechaCheckout)
	) || 0;

	return (
		<>
			{/* Resumen */}
			<div className="grid grid-cols-3 gap-x-12 gap-y-2 mb-3">
				<ConfirmRow
					label="Servicios adicionales seleccionados"
					value={form.serviciosAgregados.length
						.toString()
						.padStart(2, "0")}
				/>
			</div>

			{/* Lista de servicios */}
			<div className="grid grid-cols-3 gap-x-12 gap-y-4">
				{form.serviciosAgregados.map((s, i) => {
					const precio = Number(s.precio) || 0;
					const totalServicio = precio * noches;

					return (
						<div key={i} className="flex flex-col gap-1.5">
							<ConfirmRow label="" value={s.nombre} />

							<ConfirmRow
								icon={<Calendar size={13} />}
								label="Fecha Pedido"
								value={s.fecha ? formatDate(s.fecha) : "—"}
							/>

							<ConfirmRow
								label="Cantidad de noches"
								value={noches > 0 ? String(noches) : "—"}
							/>

							<ConfirmRow
								icon={<DollarSign size={13} />}
								label="Precio por noche"
								value={precio > 0 ? `${precio} USD` : "—"}
							/>

							<ConfirmRow
								label="Precio total"
								value={`$${s.precio}`}
							/>
						</div>
					);
				})}
			</div>

			{/* Estacionamiento */}
			<div className="grid grid-cols-3 gap-x-12 gap-y-2 mt-3">
				<ConfirmRow
					label="Estacionamiento incluido"
					value={form.estacionamiento}
				/>

				{form.estacionamiento === "Si" && (
					<ConfirmRow
						icon={<Car size={13} />}
						label="Patente"
						value={form.patente}
					/>
				)}
			</div>
		</>
	);
};

export default ServiciosConfirmacion;