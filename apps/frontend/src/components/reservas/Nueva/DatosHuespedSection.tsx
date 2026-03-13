import React from "react";
import { FormData } from "../../../types/reserva";
import { InputField } from "../../common/input/InputField";

type Props = {
	form: FormData;
	set: (k: keyof FormData, v: any) => void;
	disponible: boolean | null;
	Label: React.FC<{ children: React.ReactNode }>;
	SelectField: any;
};

export const DatosHuespedSection: React.FC<Props> = ({
	form,
	set,
	disponible,
	Label,
	SelectField,
}) => {
	return (
		<div
			style={{
				opacity: disponible ? 1 : 0.4,
				pointerEvents: disponible ? "auto" : "none",
			}}
		>
			<h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide pt-8">
				Datos del huésped
			</h2>

			<div className="grid grid-cols-4 gap-x-8 gap-y-6">
				<div>
					<Label>Nombre completo</Label>
					<InputField
						placeholder="Juan Pérez"
						value={form.nombreCompleto}
						onChange={(e) => set("nombreCompleto", e.target.value)}
					/>
				</div>

				<div>
					<Label>País</Label>
					<SelectField
						options={[
							"Seleccionar",
							"Argentina",
							"Chile",
							"Uruguay",
							"Venezuela",
						]}
						value={form.pais}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
							set("pais", e.target.value)
						}
					/>
				</div>

				<div>
					<Label>Tipo de Documento</Label>
					<SelectField
						options={["Seleccionar", "DNI", "Pasaporte"]}
						value={form.tipoDocumento}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
							set("tipoDocumento", e.target.value)
						}
					/>
				</div>

				<div>
					<Label>Documento de identidad</Label>
					<InputField
						placeholder="12345678"
						value={form.documentoIdentidad}
						onChange={(e) =>
							set("documentoIdentidad", e.target.value)
						}
					/>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-x-8 mt-6">
				<div>
					<Label>Email</Label>
					<InputField
						placeholder="juan.perez@gmail.com"
						value={form.email}
						onChange={(e) => set("email", e.target.value)}
					/>
				</div>

				<div>
					<Label>Teléfono de contacto</Label>
					<InputField
						placeholder="12345678"
						value={form.telefono}
						onChange={(e) => set("telefono", e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};