import React from "react";
import { Users, Car } from "lucide-react";
import { FormData } from "../../../types/reserva";

type Props = {
	form: FormData;
	formatDate: (date: string) => string;
	ConfirmRow: React.ComponentType<{
		icon?: React.ReactNode;
		label: string;
		value: string;
	}>;
};

const DatosEstadiaConfirmacion: React.FC<Props> = ({
	form,
	formatDate,
	ConfirmRow,
}) => {
	return (
		<div className="grid grid-cols-3 gap-x-12 gap-y-2">
			{/* Columna 1 */}
			<div className="flex flex-col gap-2">
				<ConfirmRow
					label="Fecha estimada de check-in"
					value={formatDate(form.fechaCheckin)}
				/>

				<ConfirmRow
					label="Hora estimada de llegada"
					value={form.horaLlegada}
				/>

				<ConfirmRow
					icon={<Users size={13} />}
					label="Cantidad de adultos"
					value={form.adultos.toString().padStart(2, "0")}
				/>

				<ConfirmRow
					label="Tipo de alojamiento"
					value={form.tipoAlojamiento}
				/>
			</div>

			{/* Columna 2 */}
			<div className="flex flex-col gap-2">
				<ConfirmRow
					label="Fecha estimada de check-out"
					value={formatDate(form.fechaCheckout)}
				/>

				<ConfirmRow
					label="Hora estimada de salida"
					value={form.horaCheckout}
				/>

				<ConfirmRow
					icon={<Users size={13} />}
					label="Cantidad de niños"
					value={form.ninos.toString().padStart(2, "0")}
				/>

				<ConfirmRow
					label="Alojamiento"
					value={form.numeroAlojamiento}
				/>
			</div>

			{/* Columna 3 */}
			<div className="flex flex-col gap-2">
				<ConfirmRow
					label="Cantidad de noches"
					value={form.cantidadNoches}
				/>

				{/* spacer para mantener alineación */}
				<div className="invisible pointer-events-none">
					<ConfirmRow label="placeholder" value="—" />
				</div>

				<ConfirmRow
					label="Cantidad de habitaciones"
					value={form.habitaciones
						.toString()
						.padStart(2, "0")}
				/>

				<ConfirmRow
					icon={<Car size={13} />}
					label="Ingresa con vehículo"
					value={form.ingresaVehiculo}
				/>
			</div>
		</div>
	);
};

export default DatosEstadiaConfirmacion;