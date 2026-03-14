import React from "react";
import { DollarSign, CreditCard } from "lucide-react";
import { EconData } from "../../../types/reserva";

type Props = {
	econ: EconData;
	totalEstadia: number;
	saldoPendiente: number;
	ConfirmRow: React.ComponentType<{
		icon?: React.ReactNode;
		label: string;
		value: string;
	}>;
};

const FormaPagoConfirmacion: React.FC<Props> = ({
	econ,
	totalEstadia,
	saldoPendiente,
	ConfirmRow,
}) => {
	const montoAbonaAhora =
		econ.estadoPago === "Total"
			? `${totalEstadia} USD`
			: econ.montoAbona
			? `${econ.montoAbona} USD`
			: "—";

	return (
		<div className="grid grid-cols-3 gap-x-12 gap-y-2">
			<div className="flex flex-col gap-2">
				<ConfirmRow
					label="Estado del pago"
					value={econ.estadoPago}
				/>

				<ConfirmRow
					icon={<DollarSign size={13} />}
					label="Monto pendiente"
					value={saldoPendiente > 0 ? `${saldoPendiente} USD` : "—"}
				/>

				<ConfirmRow
					label="Número de recibo/transacción"
					value={econ.nroRecibo}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<ConfirmRow
					icon={<CreditCard size={13} />}
					label="Medio de pago"
					value={econ.medioPago}
				/>

				<ConfirmRow
					icon={<DollarSign size={13} />}
					label="Monto que abona ahora"
					value={montoAbonaAhora}
				/>
			</div>
		</div>
	);
};

export default FormaPagoConfirmacion;