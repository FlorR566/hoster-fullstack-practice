import React, { useState } from "react";
import { ArrowLeft, ChevronDown, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IncidenteModal, { IncidenteDetalle } from "../../common/modals/IncidenteModal";
import ReportarIncidenteModal from "../../common/modals/ReportarIncidenteModal";
import { useIncidentData } from "../../../hooks/useIncidentData";
import { createIncidentReport } from "../../../api/incidentApi";

const ITEMS_PER_PAGE = 10;

const ReporteIncidente: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, loading, error, refresh } = useIncidentData();
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState(""); // formato YYYY-MM-DD desde input type="date"
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIncidente, setSelectedIncidente] = useState<IncidenteDetalle | null>(null);
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [modalReportarOpen, setModalReportarOpen] = useState(false);

  // Filtrado
  const filteredIncidents = incidents.filter((inc) => {
    const matchTipo = !tipoFiltro || inc.tipoIncidente === tipoFiltro;
    const matchFecha = !fechaFiltro || inc.fechaIncidente === formatDate(fechaFiltro);
    return matchTipo && matchFecha;
  });

  const totalPages = Math.ceil(filteredIncidents.length / ITEMS_PER_PAGE);
  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleVerMas = (inc: IncidenteDetalle) => {
    setSelectedIncidente(inc);
    setModalVerOpen(true);
  };

  const handleConfirmNew = async (data: any) => {
    try {
      await createIncidentReport(data);
      alert("Incidente reportado correctamente");
      refresh();
      setModalReportarOpen(false);
    } catch (err: any) {
      console.error("Error completo:", err);
      const msg = err.message.includes("Reserva no encontrada")
        ? "La reserva seleccionada no existe en el sistema"
        : err.message || "Error desconocido al reportar incidente";
      alert("Error al reportar: " + msg);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, 2, "...", totalPages - 1, totalPages];
  };

  if (loading) return <div className="p-8 text-center">Cargando incidentes...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[var(--light-bg)] p-8 font-poppins">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft
            className="text-[var(--light-text)] cursor-pointer hover:opacity-70 transition"
            size={22}
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-[22px] font-semibold text-[var(--light-text)]">Reporte de Incidente</h1>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[var(--light-text)]">Filtrar por:</span>

            <div className="relative">
              <select
                value={tipoFiltro}
                onChange={(e) => {
                  setTipoFiltro(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-[var(--light-main2)] text-[var(--light-text)] text-[13px] px-4 py-2 pr-8 rounded-lg border border-transparent focus:border-[var(--light-accent)] outline-none cursor-pointer transition"
              >
                <option value="">Tipo de Incidente</option>
                <option value="Overbooking">Overbooking</option>
                <option value="Equipamiento Roto">Equipamiento Roto</option>
                <option value="Fallo en servicios básicos">Fallo en servicios básicos</option>
                <option value="Queja de cliente">Queja de cliente</option>
                <option value="Otro">Otro</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--light-text)] opacity-60 pointer-events-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[var(--light-text)]">
              <span>Fecha:</span>
              <input
                type="date"
                value={fechaFiltro}
                onChange={(e) => {
                  setFechaFiltro(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[var(--light-main2)] border border-transparent rounded px-3 py-1.5 text-[13px] text-[var(--light-text)] focus:border-[var(--light-accent)] outline-none cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={() => setModalReportarOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-[var(--light-main2)] text-[var(--light-text)] rounded-full text-[13px] font-medium hover:opacity-80 transition cursor-pointer"
          >
            <AlertCircle size={15} />
            Reportar un incidente
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-[var(--light-outline)]">
          <div className="grid grid-cols-[1.2fr_1.3fr_1.4fr_2fr_0.6fr] bg-[var(--light-accent)] px-5 py-3">
            {["Número de Reserva", "Tipo de incidente", "Fecha del incidente", "Descripción", ""].map((h) => (
              <span key={h} className="text-[13px] font-semibold text-[var(--light-title-table)]">
                {h}
              </span>
            ))}
          </div>

          {paginatedIncidents.length === 0 ? (
            <div className="p-6 text-center text-[var(--light-text)] opacity-70">
              No hay incidentes para los filtros seleccionados
            </div>
          ) : (
            paginatedIncidents.map((inc, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1.2fr_1.3fr_1.4fr_2fr_0.6fr] px-5 py-3 items-center border-b border-[var(--light-outline)] last:border-b-0 ${
                  i % 2 === 0 ? "bg-[var(--light-column2)]" : "bg-[var(--light-column1)]"
                }`}
              >
                <span className="text-[13px] text-[var(--light-text)]">{inc.numeroReserva}</span>
                <span className="text-[13px] text-[var(--light-text)]">{inc.tipoIncidente}</span>
                <span className="text-[13px] text-[var(--light-text)]">{inc.fechaIncidente}</span>
                <span className="text-[13px] text-[var(--light-text)] truncate pr-2">{inc.descripcion}</span>
                <button
                  onClick={() => handleVerMas(inc)}
                  className="flex items-center gap-1 text-[12px] text-[var(--light-text)] opacity-70 hover:opacity-100 transition cursor-pointer whitespace-nowrap"
                >
                  <span className="text-[11px]">↗</span> Ver más
                </button>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-[13px] text-[var(--light-text)] hover:opacity-70 disabled:opacity-30 transition cursor-pointer"
            >
              ← Previous
            </button>

            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span key={`dots-${i}`} className="text-[13px] text-[var(--light-text)] px-1">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`w-7 h-7 rounded-md text-[13px] font-medium transition cursor-pointer ${
                    currentPage === page
                      ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
                      : "text-[var(--light-text)] hover:bg-[var(--light-main2)]"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-[13px] text-[var(--light-text)] hover:opacity-70 disabled:opacity-30 transition cursor-pointer"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <IncidenteModal
        isOpen={modalVerOpen}
        onClose={() => setModalVerOpen(false)}
        incidente={selectedIncidente}
      />
      <ReportarIncidenteModal
        isOpen={modalReportarOpen}
        onClose={() => setModalReportarOpen(false)}
        onConfirm={handleConfirmNew}
      />
    </div>
  );
};

const formatDate = (date: string) => {
  if (!date) return "";
  const [y, m, d] = date.split("-");
  return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
};

export default ReporteIncidente;