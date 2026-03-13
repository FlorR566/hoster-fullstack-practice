import React from "react";
import { DollarSign } from "lucide-react";

type Props = {
	precioPorNoche: number;
	totalServicios: number;
	totalNoches: number;
	totalEstadia: number;
	ConfirmRow: React.ComponentType<{
		icon?: React.ReactNode;
		label: string;
		value: string;
	}>;
};

const ResumenEconomicoConfirmacion: React.FC<Props> = ({
	precioPorNoche,
	totalServicios,
	totalNoches,
	totalEstadia,
	ConfirmRow,
}) => {
	return (
		<div className="grid grid-cols-3 gap-x-12 gap-y-2">
			<div className="flex flex-col gap-2">
				<ConfirmRow
					icon={<DollarSign size={13} />}
					label="Precio por noche"
					value={precioPorNoche > 0 ? `${precioPorNoche} USD` : "—"}
				/>

				<ConfirmRow
					icon={<DollarSign size={13} />}
					label="Precio por servicios"
					value={totalServicios > 0 ? `${totalServicios} USD` : "—"}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<ConfirmRow
					label="Precio total por noche"
					value={totalNoches > 0 ? `${totalNoches} USD` : "—"}
				/>

				<ConfirmRow
					label="Total estimado de la estadía"
					value={totalEstadia > 0 ? `${totalEstadia} USD` : "—"}
				/>
			</div>
		</div>
	);
};

export default ResumenEconomicoConfirmacion;