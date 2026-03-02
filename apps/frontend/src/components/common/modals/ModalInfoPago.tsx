import React, { useState } from "react";
import { X, UserRound, IdCard, BedDouble, UsersRound, DollarSign, Printer } from "lucide-react";
import { Reserva } from "./ModalReserva";
import ModalConfirmacion from "./ModalConfirmacion";

interface Servicio {
  nombre: string;
  fechaPedido: string;
  cantidadNoches: number;
  precioPorNoche: number;
  precioTotal: number;
}

interface ModalInfoPagoProps {
  reserva: Reserva;
  onClose: () => void;
  metodoPago?: string;
  textoPago?: string;
}

/* ─────────────────────────────────────────────
   Datos mock (hardcoded)
───────────────────────────────────────────── */
const MOCK_NUMERO_TARJETA    = "******49873";
const MOCK_PRECIO_NOCHE      = 1000;
const MOCK_PRECIO_TOTAL_EST  = 7000;
const MOCK_FECHA_CHECKIN     = "25/11/26";
const MOCK_FECHA_CHECKOUT    = "02/02/26";
const MOCK_TOTAL_POR_NOCHE   = 1150;
const MOCK_PRECIO_TOTAL_FINAL = 7950;
const MOCK_ID_TRANSACCION    = "314789012345";
const MOCK_SERVICIOS: Servicio[] = [
  { nombre: "Servicio 1", fechaPedido: "25/01/26", cantidadNoches: 7, precioPorNoche: 100, precioTotal: 700 },
  { nombre: "Servicio 2", fechaPedido: "27/01/26", cantidadNoches: 5, precioPorNoche: 50,  precioTotal: 250 },
];


const IcoServicio: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 10.5C3.5 7.5 5 5.5 8 5.5C11 5.5 12.5 7.5 12.5 10.5" />
    <line x1="8" y1="3" x2="8" y2="5.5" />
    <circle cx="8" cy="2.5" r="0.5" fill="currentColor" stroke="none" />
    <line x1="2" y1="10.5" x2="14" y2="10.5" />
    <path d="M2 10.5 Q2 12 3.5 12 H12.5 Q14 12 14 10.5" />
    <line x1="8" y1="12" x2="8" y2="13.5" />
    <circle cx="8" cy="13.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);


const IcoCalendario: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" />
    <line x1="1.5" y1="6" x2="14.5" y2="6" />
    <line x1="5" y1="1" x2="5" y2="4" />
    <line x1="11" y1="1" x2="11" y2="4" />
    <line x1="5.5" y1="6" x2="5.5" y2="14.5" />
    <line x1="10.5" y1="6" x2="10.5" y2="14.5" />
    <line x1="1.5" y1="9.5" x2="14.5" y2="9.5" />
  </svg>
);

/** Tarjeta de pago */
const IcoPago: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3.5" width="14" height="9" rx="1.5" />
    <line x1="1" y1="6.5" x2="15" y2="6.5" />
    <line x1="3" y1="9.5" x2="7" y2="9.5" />
    <line x1="3" y1="11" x2="5.5" y2="11" />
  </svg>
);

const IcoPrecioTotal: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" />
    <line x1="1.5" y1="6.5"  x2="14.5" y2="6.5" />
    <line x1="1.5" y1="11"   x2="14.5" y2="11" />
    <line x1="6.5" y1="1.5"  x2="6.5"  y2="14.5" />
    <line x1="11"  y1="1.5"  x2="11"   y2="14.5" />
  </svg>
);

const IcoBarcode: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
       stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <line x1="1"  y1="3" x2="1"  y2="13" strokeWidth="2" />
    <line x1="3.5" y1="3" x2="3.5" y2="13" />
    <line x1="5.5" y1="3" x2="5.5" y2="13" strokeWidth="2" />
    <line x1="8"  y1="3" x2="8"  y2="13" />
    <line x1="10" y1="3" x2="10" y2="13" strokeWidth="2" />
    <line x1="12" y1="3" x2="12" y2="13" />
    <line x1="14.5" y1="3" x2="14.5" y2="13" strokeWidth="2" />
  </svg>
);

const InfoRow: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-[9px] text-[13px] text-[var(--light-text)]">
    <span className="shrink-0 flex items-center opacity-75">{icon}</span>
    <span>{text}</span>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-poppins font-bold text-[15px] text-[var(--light-text)] m-0 mb-3">
    {children}
  </p>
);

const Divider: React.FC = () => (
  <div className="border-t border-[var(--light-outline)] my-4" />
);

/* ─────────────────────────────────────────────
   Modal Información de Pago
───────────────────────────────────────────── */
const ModalInfoPago: React.FC<ModalInfoPagoProps> = ({
  reserva,
  onClose,
  metodoPago = "Tarjeta",
}) => {
  const [confirmando, setConfirmando] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirmarFinal = () => {
    console.log("Check-out confirmado para reserva:", reserva.id);
    setConfirmando(false);
    onClose();
  };

  return (
    <>
      <style>{`
        @keyframes ip-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ip-slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .ip-overlay { animation: ip-fadeIn  0.2s ease; }
        .ip-card    { animation: ip-slideUp 0.25s cubic-bezier(.22,.68,0,1.2); }

        .ip-scroll {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--light-main) transparent;
        }
        .ip-scroll::-webkit-scrollbar       { width: 5px; }
        .ip-scroll::-webkit-scrollbar-thumb { background: var(--light-main); border-radius: 4px; }
        .ip-scroll::-webkit-scrollbar-track { background: transparent; }

        .ip-btn-ghost {
          height: 40px; padding: 0 22px; border-radius: 20px; border: none;
          background: var(--light-main2); color: var(--light-text);
          font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          transition: background 0.2s, transform 0.1s;
        }
        .ip-btn-ghost:hover  { background: var(--light-main); transform: translateY(-1px); }
        .ip-btn-ghost:active { transform: translateY(0); }

        .ip-btn-primary {
          height: 40px; padding: 0 22px; border-radius: 20px; border: none;
          background: var(--light-accent); color: #fff;
          font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .ip-btn-primary:hover  { opacity: 0.88; transform: translateY(-1px); }
        .ip-btn-primary:active { transform: translateY(0); }
      `}</style>

      {/* Overlay */}
      <div
        className="ip-overlay fixed inset-0 z-[1150] flex items-center justify-center p-4
                   bg-[rgba(5,5,52,0.45)] dark:bg-[rgba(2,6,23,0.75)]"
        onClick={handleOverlayClick}
      >
        {/* Card */}
        <div
          className="ip-card relative w-full max-w-[460px] rounded-[20px]
                     bg-[var(--light-card)]
                     shadow-[0_24px_64px_rgba(84,81,255,0.18)]
                     dark:shadow-[0_24px_64px_rgba(0,0,0,0.6)]
                     text-[var(--light-text)]
                     flex flex-col max-h-[90vh]"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header fijo ── */}
          <div className="px-7 pt-7 pb-3 shrink-0">
            <h2 className="font-poppins font-bold text-[24px] text-[var(--light-text)] m-0">
              Informacion de Pago
            </h2>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-5 right-5 flex items-center justify-center
                         w-8 h-8 rounded-lg border-none bg-transparent
                         text-[var(--light-text)] opacity-60 cursor-pointer
                         hover:opacity-100 hover:bg-[var(--light-main2)]
                         transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Contenido scrolleable ── */}
          <div className="ip-scroll px-7 pb-3 flex-1">

            {/* Bloque 1: datos del huésped */}
            <div className="flex flex-col gap-[11px] mb-1">
              <InfoRow icon={<IcoServicio />}  text={`Reserva #${reserva.id}`} />

              <div className="grid grid-cols-2 gap-x-6 gap-y-[11px]">
                <InfoRow icon={<UserRound size={14} />} text={reserva.nombre} />
                <InfoRow icon={<IdCard size={14} />}    text={reserva.documento} />
              </div>

              <InfoRow icon={<IcoPago />} text={`Metodo de Pago: ${metodoPago}`} />
              <InfoRow icon={<IcoPago />} text={`Número de tarjeta: ${MOCK_NUMERO_TARJETA}`} />
            </div>

            <Divider />

            {/* Bloque 2: detalle de pago */}
            <SectionTitle>Detalle de pago</SectionTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-[11px] mb-1">
              <InfoRow icon={<BedDouble size={14} />}   text={`Habitación: ${reserva.habitacion}`} />
              <InfoRow icon={<UsersRound size={14} />}  text={`${reserva.personas} Personas`} />
              <InfoRow icon={<IcoCalendario />}         text={`Fecha Check-In: ${MOCK_FECHA_CHECKIN}`} />
              <InfoRow icon={<IcoCalendario />}         text={`Fecha Check-Out: ${MOCK_FECHA_CHECKOUT}`} />
              <InfoRow icon={<DollarSign size={14} />}  text={`Precio por noche: $${MOCK_PRECIO_NOCHE}`} />
              <InfoRow icon={<IcoPrecioTotal />}        text={`Precio total: $${MOCK_PRECIO_TOTAL_EST}`} />
            </div>

            <Divider />

            {/* Bloque 3: servicios adicionales */}
            <SectionTitle>Servicios Adicionales</SectionTitle>
            <div className="flex flex-col gap-[11px] mb-1">
              {MOCK_SERVICIOS.map((srv, i) => (
                <React.Fragment key={i}>
                  <InfoRow icon={<IcoServicio />} text={srv.nombre} />

                  {/* Detalle del servicio en grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-[11px]">
                    <InfoRow icon={<IcoCalendario />}        text={`Fecha Pedido: ${srv.fechaPedido}`} />
                    <InfoRow icon={<UsersRound size={14} />} text={`Cantidad de noches: ${srv.cantidadNoches}`} />
                    <InfoRow icon={<DollarSign size={14} />} text={`Precio por noche: $${srv.precioPorNoche}`} />
                    <InfoRow icon={<IcoPrecioTotal />}       text={`Precio total: $${srv.precioTotal}`} />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <Divider />

            {/* Bloque 4: totales finales */}
            <div className="flex flex-col gap-[11px] mb-2">
              <InfoRow icon={<DollarSign size={14} />} text={`Precio total por noche: $${MOCK_TOTAL_POR_NOCHE}`} />
              <InfoRow icon={<IcoPrecioTotal />}        text={`Precio total: $${MOCK_PRECIO_TOTAL_FINAL}`} />
              <InfoRow icon={<IcoBarcode />}            text={`ID de Transacción: ${MOCK_ID_TRANSACCION}`} />
            </div>

          </div>

          {/* ── Footer fijo ── */}
          <div className="px-7 py-5 shrink-0 flex items-center justify-end gap-3
                          border-t border-[var(--light-outline)]">
            <button className="ip-btn-ghost" onClick={() => window.print()}>
              <Printer size={15} />
              Imprimir
            </button>
            <button className="ip-btn-primary" onClick={() => setConfirmando(true)}>
              Confirmar
            </button>
          </div>
        </div>
      </div>

      {/* Modal confirmación final */}
      {confirmando && (
        <ModalConfirmacion
          onConfirmar={handleConfirmarFinal}
          onCancelar={() => setConfirmando(false)}
          zIndex={1300}
        />
      )}
    </>
  );
};

export default ModalInfoPago;