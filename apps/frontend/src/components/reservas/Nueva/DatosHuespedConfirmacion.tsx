import React from "react";
import { User, Mail, Phone } from "lucide-react";
import { FormData } from "../../../types/reserva";

type Props = {
	form: FormData;
	ConfirmRow: React.ComponentType<{
		icon?: React.ReactNode;
		label: string;
		value: string;
	}>;
};

const DatosHuespedConfirmacion: React.FC<Props> = ({
	form,
	ConfirmRow,
}) => {
	return (
		<div className="grid grid-cols-3 gap-x-12 gap-y-2">
			<div className="flex flex-col gap-2">
				<ConfirmRow
					icon={<User size={13} />}
					label="Nombre completo"
					value={form.nombreCompleto}
				/>
				<ConfirmRow
					icon={<Mail size={13} />}
					label="Email"
					value={form.email}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<ConfirmRow label="País" value={form.pais} />
				<ConfirmRow
					icon={<Phone size={13} />}
					label="Teléfono"
					value={form.telefono}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<ConfirmRow
					label="Tipo de documento"
					value={form.tipoDocumento}
				/>
				<ConfirmRow
					label="Número de identidad"
					value={form.documentoIdentidad}
				/>
			</div>
		</div>
	);
};

export default DatosHuespedConfirmacion;