import React, { useState } from "react";
import { ArrowLeft, ChevronDown, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IncidenteModal, { IncidenteDetalle } from "../../common/modals/IncidenteModal";
import ReportarIncidenteModal from "../../common/modals/ReportarIncidenteModal";

const mockIncidentes: IncidenteDetalle[] = [
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Juan Perez",
    tipoIncidente: "Overbooking",
    fechaIncidente: "12/03/2026",
    horaIncidente: "12:00",
    descripcion: "Se detectó un overbooking en la categoría de habitación Standard debido a un error de sincronización con el channel manager. Al momento del check-in, no contamos con disponibilidad física de la categoría reservada.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: true,
    compensacion: "Reubicación del huésped a una habitación de categoría superior",
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Juan Perez",
    tipoIncidente: "Overbooking",
    fechaIncidente: "12/03/2026",
    horaIncidente: "12:00",
    descripcion: "Se detectó un overbooking en la categoría de habitación Standard debido a un error de sincronización con el channel manager. Al momento del check-in, no contamos con disponibilidad física de la categoría reservada.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: true,
    compensacion: "Reubicación del huésped a una habitación de categoría superior",
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Juan Perez",
    tipoIncidente: "Overbooking",
    fechaIncidente: "12/03/2026",
    horaIncidente: "12:00",
    descripcion: "Se detectó un overbooking en la categoría de habitación Standard.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: false,
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Juan Perez",
    tipoIncidente: "Overbooking",
    fechaIncidente: "12/03/2026",
    horaIncidente: "12:00",
    descripcion: "Se detectó un overbooking en la categoría de habitación Standard.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: false,
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Carlos Ruiz",
    tipoIncidente: "Equipamiento Roto",
    fechaIncidente: "25/03/2026",
    horaIncidente: "08:00",
    descripcion: "El sistema de aire acondicionado presenta una falla en el compresor.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: false,
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Maria Lopez",
    tipoIncidente: "Fallo en servicios basicos",
    fechaIncidente: "25/03/2026",
    horaIncidente: "16:00",
    descripcion: "Rotura en la tubería principal de agua caliente de la habitación 302.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: true,
    compensacion: "Traslado temporal a habitación disponible",
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Carlos Ruiz",
    tipoIncidente: "Equipamiento Roto",
    fechaIncidente: "25/03/2026",
    horaIncidente: "08:00",
    descripcion: "El sistema de aire acondicionado presenta una falla en el compresor.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: false,
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Carlos Ruiz",
    tipoIncidente: "Equipamiento Roto",
    fechaIncidente: "25/03/2026",
    horaIncidente: "08:00",
    descripcion: "El sistema de aire acondicionado presenta una falla en el compresor.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: false,
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Carlos Ruiz",
    tipoIncidente: "Equipamiento Roto",
    fechaIncidente: "25/03/2026",
    horaIncidente: "08:00",
    descripcion: "El sistema de aire acondicionado presenta una falla en el compresor.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: false,
  },
  {
    numeroReserva: "HSTR-2026-000341",
    nombreHuesped: "Maria Lopez",
    tipoIncidente: "Fallo en servicios basicos",
    fechaIncidente: "25/03/2026",
    horaIncidente: "16:00",
    descripcion: "Rotura en la tubería principal de agua caliente de la habitación 302.",
    nombreRecepcionista: "Laura Martinez",
    recibeCompensacion: true,
    compensacion: "Traslado temporal a habitación disponible",
  },
];

const TOTAL_PAGES = 68;

const ReporteIncidente: React.FC = () => {
  const navigate = useNavigate();
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal ver detalle
  const [selectedIncidente, setSelectedIncidente] = useState<IncidenteDetalle | null>(null);
  const [modalVerOpen, setModalVerOpen] = useState(false);

  // Modal reportar nuevo incidente
  const [modalReportarOpen, setModalReportarOpen] = useState(false);

  const handleVerMas = (inc: IncidenteDetalle) => {
    setSelectedIncidente(inc);
    setModalVerOpen(true);
  };

  const getPageNumbers = () => {
    if (TOTAL_PAGES <= 5) return Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", TOTAL_PAGES - 1, TOTAL_PAGES];
    if (currentPage >= TOTAL_PAGES - 2) return [1, 2, "...", TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES];
    return [1, 2, 3, "...", TOTAL_PAGES - 1, TOTAL_PAGES];
  };

  return (
    <div className="min-h-screen bg-[var(--light-bg)] p-8 font-poppins">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft
            className="text-[var(--light-text)] cursor-pointer hover:opacity-70 transition"
            size={22}
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-[22px] font-semibold text-[var(--light-text)]">Reporte de Incidente</h1>
        </div>

        {/* Filtros + Botón */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[var(--light-text)]">Filtrar por:</span>

            {/* Select Tipo */}
            <div className="relative">
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="appearance-none bg-[var(--light-main2)] text-[var(--light-text)] text-[13px] px-4 py-2 pr-8 rounded-lg border border-transparent focus:border-[var(--light-accent)] outline-none cursor-pointer transition"
              >
                <option value="">Tipo de Incidente</option>
                <option value="Overbooking">Overbooking</option>
                <option value="Equipamiento Roto">Equipamiento Roto</option>
                <option value="Fallo en servicios basicos">Fallo en servicios basicos</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--light-text)] opacity-60 pointer-events-none"
              />
            </div>

            {/* Fecha */}
            <div className="flex items-center gap-2 text-[13px] text-[var(--light-text)]">
              <span>Fecha:</span>
              <input
                type="date"
                value={fechaFiltro}
                onChange={(e) => setFechaFiltro(e.target.value)}
                placeholder="DD/MM/AAAA"
                className="bg-transparent border-none outline-none text-[13px] text-[var(--light-text)] cursor-pointer"
                style={{ colorScheme: "light dark" }}
              />
            </div>
          </div>

          {/* Botón Reportar un incidente */}
          <button
            onClick={() => setModalReportarOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-[var(--light-main2)] text-[var(--light-text)] rounded-full text-[13px] font-medium hover:opacity-80 transition cursor-pointer"
          >
            <AlertCircle size={15} />
            Reportar un incidente
          </button>
        </div>

        {/* Tabla */}
        <div className="rounded-xl overflow-hidden border border-[var(--light-outline)]">
          <div className="grid grid-cols-[1.2fr_1.3fr_1.4fr_2fr_0.6fr] bg-[var(--light-accent)] px-5 py-3">
            {["Numero de Reserva", "Tipo de incidente", "Fecha del incidente", "Descripcion", ""].map((h) => (
              <span key={h} className="text-[13px] font-semibold text-[var(--light-title-table)]">{h}</span>
            ))}
          </div>

          {/* Filas */}
          {mockIncidentes.map((inc, i) => (
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
          ))}
        </div>

        {/* Paginación */}
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
            onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={currentPage === TOTAL_PAGES}
            className="flex items-center gap-1 text-[13px] text-[var(--light-text)] hover:opacity-70 disabled:opacity-30 transition cursor-pointer"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Modal ver detalle */}
      <IncidenteModal
        isOpen={modalVerOpen}
        onClose={() => setModalVerOpen(false)}
        incidente={selectedIncidente}
      />

      {/* Modal reportar nuevo incidente */}
      <ReportarIncidenteModal
        isOpen={modalReportarOpen}
        onClose={() => setModalReportarOpen(false)}
        onConfirm={(data) => {
          console.log("Nuevo incidente reportado:", data);
        }}
      />
    </div>
  );
};

export default ReporteIncidente;