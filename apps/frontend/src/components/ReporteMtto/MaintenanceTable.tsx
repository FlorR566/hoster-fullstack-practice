import { ArrowUpRight } from "lucide-react";
import { MaintenanceReport } from "../../types/maintenance";

interface Props {
	data: MaintenanceReport[];
	onViewMore: (id: string) => void;
}

export const MaintenanceTable = ({ data, onViewMore }: Props) => {
	return (
		<table className="w-full text-left border-collapse font-['Poppins'] text-[18px]">
			{/* Header */}
			<thead>
				<tr className="bg-[var(--light-accent)] text-[var(--light-title-table)]">
					<th className="px-4 py-3 font-normal">ID del reporte</th>
					<th className="px-4 py-3 font-normal">Alojamiento</th>
					<th className="px-4 py-3 font-normal">Estado</th>
					<th className="px-4 py-3 font-normal">Fecha del reporte</th>
					<th className="px-4 py-3 font-normal">Descripción</th>
					<th className="px-4 py-3 font-normal text-right"></th>
				</tr>
			</thead>

			{/* Body */}
			{/* <tbody className="divide-y text-[var(--light-text)]"> */}
			<tbody className="text-[var(--light-text)] text-[15px]">
				{data.map((report) => (
					<tr key={report.id} className="border-t border-[var(--light-text)]">
						{/* Col 1 */}
						<td className="px-4 py-3 bg-[var(--light-column1)]">{report.id}</td>
						{/* Col 2 */}
						<td className="px-4 py-3 bg-[var(--light-column2)]">
							{report.roomId}
						</td>
						{/* Col 3 */}
						<td className="px-4 py-3 bg-[var(--light-column1)]">
							{report.status}
						</td>
						{/* Col 4 */}
						<td className="px-4 py-3 bg-[var(--light-column2)]">
							{report.reportDate}
						</td>
						{/* Col 5 */}
						<td className="px-4  max-w-xs truncate bg-[var(--light-column1)]">
							{report.description}
						</td>
						{/* Llamada a la acción */}
						<td className="px-4  text-right  bg-[var(--light-column1)]">
							<button
								onClick={() => onViewMore(report.id)}
								className="px-4 py-2 inline-flex items-center gap-2 rounded-xl bg-[var(--light-column2)] hover:opacity-60"
							>
								<ArrowUpRight size={20} /> Ver más
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
