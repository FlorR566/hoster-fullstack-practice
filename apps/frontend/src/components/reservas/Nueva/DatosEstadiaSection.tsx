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
	return (
		<>
			<div className="grid grid-cols-4 gap-x-8 gap-y-6">
				<div>
					<Label>Fecha estimada de check-in</Label>
					<DateInput
						value={form.fechaCheckin}
						onChange={(v: string) => {
							set("fechaCheckin", v);
							setDisponible(null);
						}}
						placeholder="DD/MM/AAAA"
					/>
				</div>

				<div>
					<Label>Fecha estimada de check-out</Label>
					<DateInput
						value={form.fechaCheckout}
						onChange={(v: string) => {
							set("fechaCheckout", v);
							setDisponible(null);
						}}
						placeholder="DD/MM/AAAA"
					/>
				</div>

				<div>
					<Label>Cantidad de noches</Label>
					<InputField
						value={form.cantidadNoches}
						placeholder="00"
						readOnly
					/>
				</div>

				<div className="row-span-2">
					<Label>Cantidad de personas</Label>
					<div
						className="space-y-2 mt-1"
						style={{
							opacity: disponible ? 1 : 0.4,
							pointerEvents: disponible ? "auto" : "none",
						}}
					>
						<CounterField
							label="Huéspedes"
							value={form.adultos}
							onChange={(v: number) => set("adultos", Math.min(4, v))}
						/>
					</div>
				</div>

				<div>
					<Label>Hora estimada de llegada</Label>
					<TimeInput
						value={form.horaLlegada}
						onChange={(v: string) => set("horaLlegada", v)}
						placeholder="14:00"
						disabled={!disponible}
					/>
				</div>

				<div>
					<Label>Hora estimada de check-out</Label>
					<TimeInput
						value={form.horaCheckout}
						onChange={(v: string) => set("horaCheckout", v)}
						placeholder="10:00"
						disabled={!disponible}
					/>
				</div>

				<div />

				<div>
					<Label>Tipo de alojamiento</Label>
					<InputField
						value={form.tipoAlojamiento}
						placeholder="—"
						readOnly
						disabled={!disponible}
					/>

					<button
						type="button"
						onClick={() => setShowDisponibilidad(true)}
						className="text-[15px] font-medium text-[var(--light-accent)] underline cursor-pointer hover:opacity-70 mt-2 pl-1"
					>
						Ver disponibilidad
					</button>
				</div>

				<div>
					<Label>Número de alojamiento</Label>
					<InputField
						placeholder="H03-D"
						value={form.numeroAlojamiento}
						onChange={(e) =>
							set("numeroAlojamiento", e.target.value)
						}
						disabled={!disponible}
						readOnly
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