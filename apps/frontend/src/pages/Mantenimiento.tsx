import { useState } from "react";
import { MaintenanceTable } from "../components/ReporteMtto/MaintenanceTable";
import { MaintenanceHeader } from "../components/ReporteMtto/MaintenanceHeader";
import { ReportModal } from "../components/ReporteMtto/ReporteModal";
import { DetailModal } from "../components/ReporteMtto/DetailModal";
import { MaintenanceFilters } from "../components/ReporteMtto/MaintenanceFilter";
import { useMaintenanceData } from "../hooks/useMaintenanceData";

const Mantenimiento = () => {
  const { reports, loading, error, filters, setFilters, refresh } = useMaintenanceData();

  const [isNewReportOpen, setIsNewReportOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const selectedReport = reports.find((r) => r.id === selectedReportId);

  const handleNewReportClose = () => {
  setIsNewReportOpen(false);
  setTimeout(() => {
    refresh();
  }, 500);
};

  if (loading) return <div className="p-8 text-center">Cargando reportes...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[var(--light-bg)] p-8 font-poppins">
      <MaintenanceHeader
        activeTab={filters.category}
        onTabChange={(tab) => setFilters({ ...filters, category: tab })}
        onNewReport={() => setIsNewReportOpen(true)}
      />

      <MaintenanceFilters
        filters={filters}
        onChange={(key, value) => setFilters({ ...filters, [key]: value })}
      />

      <MaintenanceTable
        data={reports}
        onViewMore={(id) => setSelectedReportId(id)}
      />

      {isNewReportOpen && <ReportModal onClose={handleNewReportClose} />}

      {selectedReport && (
        <DetailModal
          report={selectedReport}
          onClose={() => setSelectedReportId(null)}
        />
      )}
    </div>
  );
};

export default Mantenimiento;