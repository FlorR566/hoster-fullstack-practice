import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MaintenanceReport } from "../../types/maintenance";
import { Pagination } from "../common/Navigation/Pagination";

const ITEMS_PER_PAGE = 10;

interface Props {
	data: MaintenanceReport[];
	onViewMore: (id: string) => void;
}

export const MaintenanceTable = ({ data, onViewMore }: Props) => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

	const paginatedData = data.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	return (
		<div className="mt-6 flex flex-col w-full">
			<div className="overflow-x-auto rounded-2xl border border-[var(--light-text)] border-collapse">
				<table className="w-full font-['Poppins'] text-left text-[18px]">
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
					<tbody className="text-[var(--light-text)] text-[15px]">
						{paginatedData.map((report) => (
							<tr
								key={report.id}
								className="border-t border-[var(--light-text)]"
							>
								{/* Col 1 */}
								<td className="px-4 py-3 bg-[var(--light-column1)]">
									{report.id}
								</td>
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
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};
