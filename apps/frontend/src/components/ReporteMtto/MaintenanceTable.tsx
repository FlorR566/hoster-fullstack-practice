import { ExternalLink } from "lucide-react";
import { MaintenanceReport } from "../../types/maintenance";

interface Props {
	data: MaintenanceReport[];
	onViewMore: (id: string) => void;
}

export const MaintenanceTable = ({ data, onViewMore }: Props) => {
	return (
		<table className="w-full text-left border-collapse font-['Poppins']">
			<thead>
				<tr className="bg-[var(--light-accent)] text-[var(--light-title-table)] text-[18px]">
					<th className="px-4 py-4 font-normal">ID del reporte</th>
					<th className="px-4 py-4 font-normal">Alojamiento</th>
					<th className="px-4 py-4 font-normal">Estado</th>
					<th className="px-4 py-4 font-normal">Fecha del reporte</th>
					<th className="px-4 py-4 font-normal">Descripción</th>
					<th className="px-4 py-4 font-normal text-right"></th>
				</tr>
			</thead>
			<tbody className="divide-y text-[var(--light-text)] text-[16px] ">
				{data.map((report) => (
					<tr key={report.id} className=" bg-[var(--light-bg)]">
						<td className="px-4 py-4 bg-[var(--light-column1)]">{report.id}</td>
						<td className="px-4 py-4 bg-[var(--light-column2)]">
							{report.roomId}
						</td>
						<td className="px-4 py-4 bg-[var(--light-column1)]">
							{report.status}
						</td>
						<td className="px-4 py-4 bg-[var(--light-column2)]">
							{report.reportDate}
						</td>
						<td className="px-4 py-4 max-w-xs truncate bg-[var(--light-column1)]">
							{report.description}
						</td>
						<td className="px-4 py-4 text-right">
							<button
								onClick={() => onViewMore(report.id)}
								className="inline-flex items-center gap-1 text-[var(--light-text)]  hover:underline"
							>
								<ExternalLink size={16} /> Ver más
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
