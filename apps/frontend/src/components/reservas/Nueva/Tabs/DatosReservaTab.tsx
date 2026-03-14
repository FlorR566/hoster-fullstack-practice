import React, { useEffect, useState } from "react";
import { DisponibilidadModal } from "../../../reservas/DisponibilidadModal";

import { FormData } from "../../../../types/reserva";
import { calcNights } from "../../../../utils/reserve";

import { DatosEstadiaSection } from "../DatosEstadiaSection";
import { DatosReservaInfoSection } from "../DatosReservaInfoSection";
import { DatosHuespedSection } from "../DatosHuespedSection";
import { ServiciosAdicionalesSection } from "../ServiciosAdicionalesSection";

type Props = {
	form: FormData;
	set: (k: keyof FormData, v: any) => void;

	Label: React.FC<{ children: React.ReactNode }>;
	SelectField: any;
	DateInput: any;
	TimeInput: any;
	CounterField: any;
};

const DatosReservaTab: React.FC<Props> = ({
	form,
	set,
	Label,
	SelectField,
	DateInput,
	TimeInput,
	CounterField,
}) => {
	const [disponible, setDisponible] = useState<boolean | null>(null);
	const [showDisponibilidad, setShowDisponibilidad] = useState(false);

	// 🔥 lógica central de la estadía
	useEffect(() => {
		setDisponible(null);

		// recalcular noches automáticamente
		set(
			"cantidadNoches",
			calcNights(form.fechaCheckin, form.fechaCheckout)
		);

		// sincronizar fecha servicios con check-in
		set(
			"serviciosAgregados",
			form.serviciosAgregados.map((s) => ({
				...s,
				fecha: form.fechaCheckin,
			}))
		);
	}, [form.fechaCheckin, form.fechaCheckout]);

	return (
		<form className="text-(--light-text)">
			{/* DATOS ESTADÍA */}
			<h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
				Datos de la estadía
			</h2>

			<DatosEstadiaSection
				form={form}
				set={set}
				disponible={disponible}
				setDisponible={setDisponible}
				setShowDisponibilidad={setShowDisponibilidad}
				Label={Label}
				DateInput={DateInput}
				TimeInput={TimeInput}
				CounterField={CounterField}
			/>

			<DatosReservaInfoSection
				form={form}
				set={set}
				Label={Label}
				SelectField={SelectField}
			/>

			{/* HUÉSPED */}
			<DatosHuespedSection
				form={form}
				set={set}
				disponible={disponible}
				Label={Label}
				SelectField={SelectField}
			/>

			{/* SERVICIOS */}
			<div className="mt-4">
				<ServiciosAdicionalesSection
					form={form}
					set={set}
					Label={Label}
					SelectField={SelectField}
				/>
			</div>

			{showDisponibilidad && (
				<DisponibilidadModal
					onClose={() => setShowDisponibilidad(false)}
					onSelect={(room) => {
						set("numeroAlojamiento", room.id);
						set("tipoAlojamiento", room.type);
						setDisponible(true);
					}}
				/>
			)}
		</form>
	);
};

export default DatosReservaTab;