import React from "react";
import { FormData } from "../../../types/reserva";
import { InputField } from "../../common/input/InputField";

type Props = {
	form: FormData;
	set: (k: keyof FormData, v: any) => void;
	disponible: boolean | null;
	setDisponible: (v: boolean | null) => void;
	setShowDisponibilidad: (v: boolean) => void;
	Label: React.FC<{ children: React.ReactNode }>;
	DateInput: any;
	TimeInput: any;
	CounterField: any;
};

export const DatosEstadiaSection: React.FC<Props> = ({
	form,
	set,
	disponible,
	setDisponible,
	setShowDisponibilidad,
	Label,
	DateInput,
	TimeInput,
	CounterField,
}) => {
	const fechasSeleccionadas = !!(form.fechaCheckin && form.fechaCheckout);

	// ✅ helper para comparar fechas
	const esCheckoutValido = (checkin: string, checkout: string) => {
		if (!checkin || !checkout) return true;

		const fechaIn = new Date(checkin);
		const fechaOut = new Date(checkout);

		return fechaOut >= fechaIn;
	};
	return (
		<>
			<div className="grid grid-cols-4 gap-x-8 gap-y-6">
				{/* CHECKIN */}
				<div>
					<Label>Fecha estimada de check-in</Label>

					<DateInput
						value={form.fechaCheckin}
						onChange={(v: string) => {
							set("fechaCheckin", v);
							setDisponible(null);

							// si el checkout quedó inválido → lo limpiamos
							if (
								form.fechaCheckout &&
								!esCheckoutValido(v, form.fechaCheckout)
							) {
								set("fechaCheckout", "");
							}
						}}
						placeholder="DD/MM/AAAA"
					/>
				</div>

				{/* CHECKOUT */}
				<div>
					<Label>Fecha estimada de check-out</Label>

					<DateInput
						value={form.fechaCheckout}
						onChange={(v: string) => {
							if (!esCheckoutValido(form.fechaCheckin, v)) {
								alert(
									"La fecha de check-out no puede ser menor al check-in",
								);
								return;
							}

							set("fechaCheckout", v);
							setDisponible(null);
						}}
						placeholder="DD/MM/AAAA"
					/>
				</div>

				{/* NOCHES */}
				<div>
					<Label>Cantidad de noches</Label>
					<InputField value={form.cantidadNoches} placeholder="00" readOnly />
				</div>

				{/* PERSONAS */}
				<div className="row-span-2">
					<Label>Cantidad de personas</Label>

					<div
						className="space-y-2 mt-1"
						style={{
							opacity: fechasSeleccionadas ? 1 : 0.4,
							pointerEvents: fechasSeleccionadas ? "auto" : "none",
						}}
					>
						<CounterField
							label="Huéspedes"
							value={form.adultos}
							onChange={(v: number) => set("adultos", Math.min(4, v))}
						/>
					</div>
				</div>

				{/* HORA LLEGADA */}
				<div>
					<Label>Hora estimada de llegada</Label>

					<TimeInput
						value={form.horaLlegada}
						onChange={(v: string) => set("horaLlegada", v)}
						placeholder="14:00"
						disabled={!fechasSeleccionadas}
					/>
				</div>

				{/* HORA CHECKOUT */}
				<div>
					<Label>Hora estimada de check-out</Label>

					<TimeInput
						value={form.horaCheckout}
						onChange={(v: string) => set("horaCheckout", v)}
						placeholder="10:00"
						disabled={!fechasSeleccionadas}
					/>
				</div>

				<div />

				{/* TIPO */}
				<div>
					<Label>Tipo de alojamiento</Label>

					<InputField
						value={form.tipoAlojamiento}
						placeholder="—"
						readOnly
						disabled={!fechasSeleccionadas}
					/>

					<button
						type="button"
						onClick={() => setShowDisponibilidad(true)}
						disabled={!fechasSeleccionadas}
						className={`text-[15px] font-medium underline mt-2 pl-1
						${!fechasSeleccionadas
								? "opacity-40 cursor-not-allowed"
								: "text-[var(--light-accent)] hover:opacity-70"
							}`}
					>
						Ver disponibilidad
					</button>
				</div>

				{/* NUMERO */}
				<div>
					<Label>Número de alojamiento</Label>

					<InputField
						placeholder="H03-D"
						value={form.numeroAlojamiento}
						onChange={(e) => set("numeroAlojamiento", e.target.value)}
						readOnly
						disabled={!fechasSeleccionadas}
					/>
				</div>
			</div>

			{disponible === false && (
				<p className="mt-3 text-[13px] text-red-400">
					No hay disponibilidad para las fechas seleccionadas.
				</p>
			)}
		</>
	);
};