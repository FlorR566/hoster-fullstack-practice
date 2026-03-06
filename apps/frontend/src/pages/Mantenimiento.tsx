import { useState } from "react";
import { MaintenanceTable } from "../components/reporteMtto/MaintenanceTable";
import { MaintenanceHeader } from "../components/reporteMtto/MaintenanceHeader";
import { ReportModal } from "../components/reporteMtto/ReporteModal";
import { useMaintenanceData } from "../hooks/useMaintenanceData";
import { DetailModal } from "../components/reporteMtto/DetailModal";
import { MaintenanceFilters } from "../components/reporteMtto/MaintenanceFilter";

const Mantenimiento = () => {
	const { reports, filters, setFilters } = useMaintenanceData();
	const [isNewReportOpen, setIsNewReportOpen] = useState(false);
	const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

	// Buscamos el objeto completo del reporte seleccionado para pasárselo al modal
	const selectedReport = reports.find((r) => r.id === selectedReportId);

	return (
		<div className="min-h-screen bg-[var(--light-bg)] p-8">
			{/* Encabezado y Navegación (Vista Global, Limpieza, etc.) */}
			<MaintenanceHeader
				activeTab={filters.category} // Le pasamos la categoría actual
				onTabChange={(tab) => setFilters({ ...filters, category: tab })} // Actualizamos el filtro
				onNewReport={() => setIsNewReportOpen(true)}
			/>

			{/* Filtros */}
			<MaintenanceFilters
				filters={filters}
				onChange={(key, value) => setFilters({ ...filters, [key]: value })}
			/>

			{/* Tabla pasándole la data del hook */}
			<MaintenanceTable
				data={reports}
				onViewMore={(id) => setSelectedReportId(id)}
			/>

			{/* Modal Nuevo Reporte */}
			{isNewReportOpen && (
				<ReportModal onClose={() => setIsNewReportOpen(false)} />
			)}

			{/* Modal detalle del Reporte: pasamos el objeto encontrado */}
			{selectedReport && (
				<DetailModal
					report={selectedReport} // Pasamos el objeto completo
					onClose={() => setSelectedReportId(null)}
				/>
			)}
		</div>
	);
};

export default Mantenimiento;
