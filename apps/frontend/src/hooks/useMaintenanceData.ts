import { useState, useEffect, useCallback } from "react";
import { MaintenanceReport } from "../types/maintenance";
import { getAllMaintenanceReports } from "../api/maintenanceApi";

export const useMaintenanceData = () => {
  const [reports, setReports] = useState<MaintenanceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    date: "",
    status: "Todo",
    category: "Vista global",
  });

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllMaintenanceReports();
      setReports(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudieron cargar los reportes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Función para refrescar manualmente
  const refresh = () => {
    fetchReports();
  };

  const filteredReports = reports.filter((r) => {
  let matchCategory = true;

  if (filters.category !== "Vista global") {
    const prefix = filters.category === "Mantenimiento" ? "M" : "L";
    matchCategory = r.id.startsWith(prefix);
  }

  const matchStatus =
    filters.status === "Todo" || r.status === filters.status;

  const matchDate =
    !filters.date ||
    r.reportDate === formatDate(filters.date);
  return matchCategory && matchStatus && matchDate;
});

  return {
    reports: filteredReports,
    allReports: reports,
    loading,
    error,
    filters,
    setFilters,
    refresh,
  };
};

const formatDate = (inputDate: string): string => {
  if (!inputDate) return "";
  // inputDate viene del <input type="date"> → YYYY-MM-DD
  const [year, month, day] = inputDate.split("-");
  return `${day}/${month}/${year}`;
};