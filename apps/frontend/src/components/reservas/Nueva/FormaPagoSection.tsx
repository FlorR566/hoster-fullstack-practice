import React from "react";
import { EconData } from "../../../types/reserva";
import { InputField } from "../../common/input/InputField";

type Props = {
	econ: EconData;
	setEcon: (k: keyof EconData, v: any) => void;
	totalEstadia: number;
	saldoPendiente: number;
	Label: React.FC<{ children: React.ReactNode }>;
	SelectField: React.FC<any>;
};

export const FormaPagoSection: React.FC<Props> = ({
	econ,
	setEcon,
	totalEstadia,
	saldoPendiente,
	Label,
	SelectField,
}) => {
	return (
		<div className="grid grid-cols-3 gap-x-8 gap-y-6">
			<div>
				<Label>Medio de pago</Label>
				<SelectField
					options={[
						"Seleccionar",
						"Efectivo",
						"Tarjeta de crédito",
						"Transferencia",
					]}
					value={econ.medioPago}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setEcon("medioPago", e.target.value)
					}
				/>
			</div>

			<div>
				<Label>Estado de pago</Label>

				<div className="flex flex-col gap-1 mt-2">
					<label className="flex items-center gap-2 text-[14px] cursor-pointer">
						<input
							type="radio"
							name="estadoPago"
							checked={econ.estadoPago === "Parcial"}
							onChange={() => setEcon("estadoPago", "Parcial")}
						/>
						Parcial
					</label>

					<label className="flex items-center gap-2 text-[14px] cursor-pointer">
						<input
							type="radio"
							name="estadoPago"
							checked={econ.estadoPago === "Total"}
							onChange={() => setEcon("estadoPago", "Total")}
						/>
						Total
					</label>
				</div>
			</div>

			<div />

			<div>
				<Label>Monto que abona ahora</Label>
				<InputField
					placeholder="00 USD"
					value={
						econ.estadoPago === "Total"
							? `${totalEstadia} USD`
							: econ.montoAbona
					}
					onChange={(e) => setEcon("montoAbona", e.target.value)}
					readOnly={econ.estadoPago === "Total"}
				/>
			</div>

			<div>
				<Label>Saldo pendiente</Label>
				<InputField
					placeholder="00 USD"
					value={
						econ.estadoPago === "Total"
							? "0 USD"
							: saldoPendiente > 0
							? `${saldoPendiente} USD`
							: "0 USD"
					}
					readOnly
				/>
			</div>

			<div>
				<Label>Número de recibo/transacción</Label>
				<InputField
					placeholder="1487"
					value={econ.nroRecibo}
					onChange={(e) => setEcon("nroRecibo", e.target.value)}
				/>
			</div>
		</div>
	);
};