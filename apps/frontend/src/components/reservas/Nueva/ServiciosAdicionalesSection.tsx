import React from "react";
import { FormData } from "../../../types/reserva";
import { formatDate } from "../../../utils/date/formatDateToYmd";
import { InputField } from "../../common/input/InputField";

type Props = {
	form: FormData;
	set: (k: keyof FormData, v: any) => void;
	Label: React.FC<{ children: React.ReactNode }>;
	SelectField: any;
};

export const ServiciosAdicionalesSection: React.FC<Props> = ({
	form,
	set,
	Label,
	SelectField,
}) => {
	const agregarServicio = (nombre: string) => {
		if (!nombre) return;

		set("serviciosAgregados", [
			...form.serviciosAgregados,
			{
				nombre,
				precio: "120",
				fecha: form.fechaCheckin,
			},
		]);
	};

	const eliminarServicio = (index: number) => {
		set(
			"serviciosAgregados",
			form.serviciosAgregados.filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
				Servicios adicionales
			</h2>

			<div className="grid grid-cols-3 gap-x-8 items-start">
				{/* Col 1 */}
				<div className="flex flex-col gap-4">
					<div>
						<Label>Agregar un servicio</Label>
						<SelectField
							options={[
								"Seleccionar",
								"Tour",
								"Masaje",
								"Desayuno",
								"Traslado",
							]}
							value=""
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								agregarServicio(e.target.value)
							}
						/>
					</div>
				</div>

				{/* Col 2 */}
				<div>
					<p className="text-[14px] font-medium mb-2 ml-1">
						Servicios agregados
					</p>

					<div className="space-y-2">
						{form.serviciosAgregados.map((s, i) => (
							<div
								key={i}
								className="bg-[var(--light-main2)] rounded-lg px-4 py-3 flex justify-between items-center"
							>
								<div>
									<p className="text-[13px] font-medium">{s.nombre}</p>

									<p className="text-[11px] text-(--light-placeholder) mt-0.5">
										{formatDate(
											new Date().toISOString().split("T")[0],
										)}
										{"   "}
										{s.precio} USD
									</p>
								</div>

								<button
									type="button"
									onClick={() => eliminarServicio(i)}
									className="text-(--light-text) hover:opacity-70 shrink-0 text-[18px] leading-none"
								>
									−
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Col 3 */}
				<div className="flex flex-col gap-3">
					<div>
						<Label>Estacionamiento incluido</Label>

						<div className="flex flex-col gap-1 mt-2">
							<label className="flex items-center gap-1.5 text-[14px] cursor-pointer">
								<input
									type="radio"
									name="p"
									checked={form.estacionamiento === "No"}
									onChange={() => set("estacionamiento", "No")}
								/>
								No
							</label>

							<label className="flex items-center gap-1.5 text-[14px] cursor-pointer">
								<input
									type="radio"
									name="p"
									checked={form.estacionamiento === "Si"}
									onChange={() => set("estacionamiento", "Si")}
								/>
								Si
							</label>
						</div>
					</div>

					{form.estacionamiento === "Si" && (
						<div>
							<Label>Patente</Label>
							<InputField
								placeholder="AA 342 ZQ"
								value={form.patente}
								onChange={(e) => set("patente", e.target.value)}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};