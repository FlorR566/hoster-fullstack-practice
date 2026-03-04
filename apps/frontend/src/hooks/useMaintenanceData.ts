import { useState, useMemo, useEffect } from "react";
import { MaintenanceReport } from "../types/maintenance";
// Importamos el JSON
import dataRaw from "../data/datamaintenance.json";

export const useMaintenanceData = () => {
	// 1. Inicializamos con el JSON casteado para evitar el error de TS
	const [reports, setReports] = useState<MaintenanceReport[]>(
		dataRaw as MaintenanceReport[],
	);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		date: "",
		status: "Todo",
		category: "Vista global",
	});

	useEffect(() => {
		// Simulamos una carga de API
		const loadData = async () => {
			setLoading(true);
			// Aquí iría tu fetch real. Por ahora usamos el JSON
			// const response = await fetch('api/mantenimiento');
			// const result = await response.json();

			setReports(dataRaw as MaintenanceReport[]);
			setLoading(false);
		};

		loadData();
	}, []);

	// 2. Lógica de filtrado
	const filteredReports = useMemo(() => {
		return reports.filter((r) => {
			// 1. Lógica para las Pestañas (Buttons)
			// Si es Vista global, pasan todos. Si no, comparamos con un criterio de ID o Tipo
			const matchCategory =
				filters.category === "Vista global" ||
				(filters.category === "Mantenimiento" && r.id.startsWith("M-")) ||
				(filters.category === "Limpieza" && r.id.startsWith("L-"));

			// Filtro por Estado
			const matchStatus =
				filters.status === "Todo" || r.status === filters.status;

			// Filtro por Fecha (si el usuario seleccionó una)
			const matchDate =
				filters.date === "" || r.reportDate === formatDate(filters.date);

			return matchCategory && matchStatus && matchDate;
		});
	}, [reports, filters]);

	return {
		reports: filteredReports,
		loading,
		filters,
		setFilters,
	};
};

/**
 * Función auxiliar para convertir la fecha del input (YYYY-MM-DD)
 * al formato de tu JSON (DD/MM/YYYY)
 */
const formatDate = (dateStr: string) => {
	if (!dateStr) return "";
	const [year, month, day] = dateStr.split("-");
	return `${day}/${month}/${year}`;
};
