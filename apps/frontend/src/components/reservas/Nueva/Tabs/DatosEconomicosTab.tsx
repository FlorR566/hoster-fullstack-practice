// import React, { useEffect } from "react";
// import { FormData, EconData } from "../../../../types/reserva";
// import { calcReservaTotals } from "../../../../utils/reserve";

// import { DatosEconomicosSection } from "../DatosEconomicosSection";
// import { FormaPagoSection } from "../FormaPagoSection";

// type Props = {
// 	form: FormData;
// 	set: (k: keyof FormData, v: any) => void;

// 	econ: EconData;
// 	setEcon: (k: keyof EconData, v: any) => void;

// 	Label: React.ComponentType<{ children: React.ReactNode }>;
// 	SelectField: React.ComponentType<any>;
// };

// const DatosEconomicosTab: React.FC<Props> = ({
// 	form,
// 	set,
// 	econ,
// 	setEcon,
// 	Label,
// 	SelectField,
// }) => {
// 	/* ───────── CALCULOS AUTOMÁTICOS ───────── */

// 	const totals = calcReservaTotals(form, econ);

// 	const {
// 		totalNoches,
// 		totalServicios,
// 		totalEstadia,
// 		saldoPendiente,
// 	} = totals;

// 	/* sincroniza saldo automáticamente */
// 	useEffect(() => {
// 		setEcon("saldoPendiente", String(saldoPendiente));
// 	}, [saldoPendiente]);

// 	return (
// 		<div className="space-y-10 text-(--light-text)">

// 			{/* ───── DATOS ECONÓMICOS ───── */}
// 			<div>
// 				<h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
// 					Datos económicos
// 				</h2>

// 				<DatosEconomicosSection
// 					form={form}
// 					set={set}
// 					totalNoches={totalNoches}
// 					totalServicios={totalServicios}
// 					totalEstadia={totalEstadia}
// 					Label={Label}
// 				/>
// 			</div>

// 			{/* ───── FORMA DE PAGO ───── */}
// 			<div>
// 				<h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
// 					Forma de pago
// 				</h2>

// 				<FormaPagoSection
// 					econ={econ}
// 					setEcon={setEcon}
// 					totalEstadia={totalEstadia}
// 					saldoPendiente={saldoPendiente}
// 					Label={Label}
// 					SelectField={SelectField}
// 				/>
// 			</div>

// 			{/* ───── OBSERVACIONES ───── */}
// 			<div>
// 				<h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
// 					Observaciones
// 				</h2>

// 				<div>
// 					<Label>Nota del recepcionista</Label>

// 					<textarea
// 						rows={4}
// 						placeholder="Escribe aquí"
// 						value={econ.nota}
// 						onChange={(e) =>
// 							setEcon("nota", e.target.value)
// 						}
// 						className="
// 							w-full max-w-[340px]
// 							bg-[var(--light-main2)]
// 							border border-transparent
// 							rounded-lg
// 							px-3 py-2
// 							text-[14px]
// 							focus:border-[var(--light-accent)]
// 							outline-none
// 							resize-none
// 							transition
// 						"
// 					/>
// 				</div>
// 			</div>

// 		</div>
// 	);
// };

// export default DatosEconomicosTab;