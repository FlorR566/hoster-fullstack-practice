import React from "react";
import { FormData } from "../../../types/reserva";
import { InputField } from "../../common/input/InputField";

type Props = {
	form: FormData;
	set: (k: keyof FormData, v: any) => void;
	Label: React.FC<{ children: React.ReactNode }>;
	SelectField: any;
};

export const DatosReservaInfoSection: React.FC<Props> = ({
	form,
	set,
	Label,
	SelectField,
}) => {
	return (
		<div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-6">
			<div>
				<Label>Recepcionista</Label>
				<InputField value={form.recepcionista} disabled />
			</div>

			<div>
				<Label>Canal de reserva</Label>
				<SelectField
					options={[
						{ label: "Seleccionar", value: "" },
						{ label: "Booking", value: 1 },
						{ label: "Recepción", value: 2 },
						{ label: "Web", value: 3 },
					]}
					value={form.canalReserva}
					onChange={(e) =>
						set(
							"canalReserva",
							e.target.value ? Number(e.target.value) : ""
						)
					}
				/>
			</div>

			<div>
				<Label>ID de la reserva</Label>
				<InputField value={form.idReserva} disabled />
			</div>
		</div>
	);
};