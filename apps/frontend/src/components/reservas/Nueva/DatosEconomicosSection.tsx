import React from "react";
import { FormData } from "../../../types/reserva";
import { InputField } from "../../common/input/InputField";

type Props = {
	form: FormData;
	set: (k: keyof FormData, v: any) => void;
	totalNoches: number;
	totalEstadia: number;
	totalServicios: number;
	Label: React.FC<{ children: React.ReactNode }>;
};

export const DatosEconomicosSection: React.FC<Props> = ({
	form,
	set,
	totalNoches,
	totalEstadia,
	totalServicios,
	Label,
}) => {
	return (
		<div className="grid grid-cols-3 gap-x-8 gap-y-6">
			<div>
				<Label>Precio por noche</Label>
				<InputField
					placeholder="00 USD"
					value={form.precioPorNoche}
					onChange={(e) => set("precioPorNoche", e.target.value)}
				/>
			</div>

			<div>
				<Label>Precio total de noches</Label>
				<InputField
					placeholder="00 USD"
					value={totalNoches > 0 ? `${totalNoches} USD` : ""}
					readOnly
				/>
			</div>

			<div>
				<Label>Total estimado de la estadía</Label>
				<InputField
					placeholder="00 USD"
					value={totalEstadia > 0 ? `${totalEstadia} USD` : ""}
					readOnly
				/>
			</div>

			<div>
				<Label>Precio total de servicios</Label>
				<InputField
					placeholder="00 USD"
					value={totalServicios > 0 ? `${totalServicios} USD` : ""}
					readOnly
				/>
			</div>

			<div className="col-span-2">
				<Label>Servicios agregados</Label>

				<div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
					{form.serviciosAgregados.map((s, i) => (
						<div
							key={i}
							className="bg-(--light-main2) rounded-lg px-4 py-3 flex justify-between items-center"
						>
							<div>
								<p className="text-[13px] font-medium">{s.nombre}</p>
								<p className="text-[11px] text-(--light-placeholder)">
									{s.precio} USD
								</p>
							</div>

							<button
								type="button"
								onClick={() =>
									set(
										"serviciosAgregados",
										form.serviciosAgregados.filter((_, j) => j !== i),
									)
								}
								className="text-(--light-text) hover:opacity-70 text-[18px] leading-none"
							>
								−
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};