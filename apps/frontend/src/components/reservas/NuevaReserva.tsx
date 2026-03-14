import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, StickyNote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DisponibilidadModal } from "../reservas/DisponibilidadModal";

import { FormData, EconData } from "../../types/reserva";
import { calcNights, calcReservaTotals } from "../../utils/reserve";
import { formatDate } from "../../utils/date/formatDateToYmd";
import { SelectField } from "../common/select/SelectField";

import { DatosEstadiaSection } from "./Nueva/DatosEstadiaSection";
import { DatosReservaInfoSection } from "./Nueva/DatosReservaInfoSection";
import { DatosHuespedSection } from "./Nueva/DatosHuespedSection";
import { ServiciosAdicionalesSection } from "./Nueva/ServiciosAdicionalesSection";
import { DatosEconomicosSection } from "./Nueva/DatosEconomicosSection";
import { FormaPagoSection } from "./Nueva/FormaPagoSection";
import DatosHuespedConfirmacion from "./Nueva/DatosHuespedConfirmacion";
import DatosEstadiaConfirmacion from "./Nueva/DatosEstadiaConfirmacion";
import ServiciosConfirmacion from "./Nueva/ServiciosConfirmacion";
import ResumenEconomicoConfirmacion from "./Nueva/ResumenEconomicoConfirmacion";
import FormaPagoConfirmacion from "./Nueva/FormaPagoConfirmacion";

import { reserveApi } from "../../services/reserve";
import { mapReservePayload } from "../../utils/mapReservePayload";
import { guestApi } from "@/src/services/guestsApi";

const initialForm: FormData = {
  recepcionista: "",
  canalReserva: "",
  idReserva: "HSTR-2026-000341",
  nombreCompleto: "",
  pais: "",
  tipoDocumento: "",
  documentoIdentidad: "",
  email: "",
  telefono: "",
  fechaCheckin: "",
  fechaCheckout: "",
  cantidadNoches: "",
  ingresaVehiculo: "No",
  horaLlegada: "",
  horaCheckout: "",
  tipoAlojamiento: "",
  numeroAlojamiento: "",
  adultos: 1,
  ninos: 0,
  habitaciones: 1,
  serviciosAgregados: [
    { nombre: "Tour", precio: "120", fecha: "" },
    { nombre: "Masaje", precio: "120", fecha: "" },
  ],
  estacionamiento: "No",
  patente: "",
  precioPorNoche: "",
};

const initialEcon: EconData = {
  medioPago: "",
  estadoPago: "Total",
  montoAbona: "",
  saldoPendiente: "",
  nroRecibo: "",
  nota: "",
};

// ─── Componentes base ────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[14px] font-medium text-[var(--light-text)] ml-1 font-poppins">
    {children}
  </label>
);

const inputBase =
  "w-full bg-[var(--light-main2)] border border-transparent rounded-lg px-3 py-2 text-[14px] text-[var(--light-text)] focus:border-[var(--light-accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)] outline-none transition-all placeholder:text-[var(--light-placeholder)]";

const DateInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) => (
  <div className="relative w-full">
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`${inputBase} cursor-pointer pr-10`}
      style={{ colorScheme: "light dark" }}
    />
  </div>
);

const TimeInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) => (
  <div className="relative w-full">
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`${inputBase} cursor-pointer pr-10`}
      style={{ colorScheme: "light dark" }}
    />
  </div>
);

const CounterField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex items-center justify-between w-full">
    <span className="text-[13px] text-[var(--light-text)] font-light w-24">
      {label}
    </span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="text-[var(--light-text)] text-[16px] leading-none hover:opacity-70 select-none"
      >
        +
      </button>
      <span className="text-[14px] font-medium w-5 text-center text-[var(--light-text)]">
        {value.toString().padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="text-[var(--light-text)] text-[16px] leading-none hover:opacity-70 select-none"
      >
        −
      </button>
    </div>
  </div>
);

// ─── TAB 1: Datos de la reserva ─────────────
const DatosReservaTab: React.FC<{
  form: FormData;
  set: (k: keyof FormData, v: any) => void;
}> = ({ form, set }) => {
  const [disponible, setDisponible] = React.useState<boolean | null>(null);
  const [showDisponibilidad, setShowDisponibilidad] = React.useState(false);

  useEffect(() => {
    setDisponible(null);
    set("cantidadNoches", calcNights(form.fechaCheckin, form.fechaCheckout));
    set(
      "serviciosAgregados",
      form.serviciosAgregados.map((s) => ({
        ...s,
        fecha: form.fechaCheckin,
      })),
    );
  }, [form.fechaCheckin, form.fechaCheckout]);

  return (
    <form className="text-[var(--light-text)]">
      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
          Datos de la estadía
        </h2>

        <DatosEstadiaSection
          form={form}
          set={set}
          disponible={disponible}
          setDisponible={setDisponible}
          setShowDisponibilidad={setShowDisponibilidad}
          Label={Label}
          DateInput={DateInput}
          TimeInput={TimeInput}
          CounterField={CounterField}
        />

        <DatosReservaInfoSection
          form={form}
          set={set}
          Label={Label}
          SelectField={SelectField}
        />
      </div>

      <DatosHuespedSection
        form={form}
        set={set}
        disponible={disponible}
        Label={Label}
        SelectField={SelectField}
      />

      <div className="mt-4">
        <ServiciosAdicionalesSection
          form={form}
          set={set}
          Label={Label}
          SelectField={SelectField}
        />
      </div>

      {showDisponibilidad && (
        <DisponibilidadModal
          onClose={() => setShowDisponibilidad(false)}
          onSelect={(room) => {
            set("numeroAlojamiento", room.id);
            set("roomId", room.code);
            set("tipoAlojamiento", room.type);
            set("precioPorNoche", room.price);
            setDisponible(true);
          }}
          onNoAvailable={() => setDisponible(false)}
        />
      )}
    </form>
  );
};

// ─── TAB 2: Datos Económicos ─────────
const DatosEconomicosTab: React.FC<{
  form: FormData;
  set: (k: keyof FormData, v: any) => void;
  econ: EconData;
  setEcon: (k: keyof EconData, v: any) => void;
}> = ({ form, set, econ, setEcon }) => {
  const totals = calcReservaTotals(form, econ);
  const { totalNoches, totalServicios, totalEstadia, saldoPendiente } = totals;

  useEffect(() => {
    setEcon("saldoPendiente", String(saldoPendiente));
  }, [saldoPendiente]);

  return (
    <div className="space-y-10 text-[var(--light-text)]">
      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
          Datos económicos
        </h2>
        <DatosEconomicosSection
          form={form}
          set={set}
          totalNoches={totalNoches}
          totalEstadia={totalEstadia}
          totalServicios={totalServicios}
          Label={Label}
        />
      </div>

      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
          Forma de pago
        </h2>
        <FormaPagoSection
          econ={econ}
          setEcon={setEcon}
          totalEstadia={totalEstadia}
          saldoPendiente={saldoPendiente}
          Label={Label}
          SelectField={SelectField}
        />
      </div>

      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">
          Observaciones
        </h2>
        <div>
          <Label>Nota del recepcionista</Label>
          <textarea
            placeholder="Escribe aquí"
            rows={4}
            value={econ.nota}
            onChange={(e) => setEcon("nota", e.target.value)}
            className="w-full max-w-[340px] bg-[var(--light-main2)] border border-transparent rounded-lg px-3 py-2 text-[14px] text-[var(--light-text)] focus:border-[var(--light-accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)] outline-none resize-none placeholder:text-[var(--light-placeholder)] transition"
          />
        </div>
      </div>
    </div>
  );
};

// ─── TAB 3: Confirmación ─────────
const ConfirmSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[15px] font-bold uppercase tracking-wide mt-6 mb-3 text-[var(--light-text)]">
    {children}
  </h2>
);

const ConfirmRow = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-2 text-[13px] text-[var(--light-text)]">
    {icon && <span className="mt-[1px] opacity-60 shrink-0">{icon}</span>}
    <span>
      {label ? (
        <>
          <span className="font-medium">{label}:</span> {"  "}
        </>
      ) : null}
      {value || "—"}
    </span>
  </div>
);

const ConfirmacionTab: React.FC<{ form: FormData; econ: EconData }> = ({
  form,
  econ,
}) => {
  const { totalNoches, totalServicios, totalEstadia, saldoPendiente } =
    calcReservaTotals(form, econ);
  const precioPorNoche = parseFloat(form.precioPorNoche) || 0;

  return (
    <div className="text-[var(--light-text)] max-w-full">
      <h2 className="text-[18px] font-bold mb-4 text-[var(--light-text)]">
        Confirmación
      </h2>

      <div className="grid grid-cols-3 gap-x-12 gap-y-2 mb-2">
        <ConfirmRow label="Recepcionista" value={form.recepcionista} />
        <ConfirmRow label="Canal" value={form.canalReserva} />
        <ConfirmRow label="ID de la reserva" value={form.idReserva} />
      </div>

      <ConfirmSectionTitle>Datos del huésped</ConfirmSectionTitle>
      <DatosHuespedConfirmacion form={form} ConfirmRow={ConfirmRow} />

      <ConfirmSectionTitle>Datos de la estadía</ConfirmSectionTitle>
      <DatosEstadiaConfirmacion
        form={form}
        formatDate={formatDate}
        ConfirmRow={ConfirmRow}
      />

      <div className="mt-2">
        <ConfirmSectionTitle>Servicios adicionales</ConfirmSectionTitle>
        <ServiciosConfirmacion form={form} ConfirmRow={ConfirmRow} />
      </div>

      <ConfirmSectionTitle>Datos económicos</ConfirmSectionTitle>
      <ResumenEconomicoConfirmacion
        precioPorNoche={precioPorNoche}
        totalServicios={totalServicios}
        totalNoches={totalNoches}
        totalEstadia={totalEstadia}
        ConfirmRow={ConfirmRow}
      />

      <ConfirmSectionTitle>Forma de pago</ConfirmSectionTitle>
      <FormaPagoConfirmacion
        econ={econ}
        totalEstadia={totalEstadia}
        saldoPendiente={saldoPendiente}
        ConfirmRow={ConfirmRow}
      />

      <ConfirmSectionTitle>Observaciones</ConfirmSectionTitle>
      <ConfirmRow
        icon={<StickyNote size={13} />}
        label="Nota del recepcionista"
        value={econ.nota}
      />
    </div>
  );
};

type Tab = "Datos de la reserva" | "Datos económicos" | "Confirmación";

const NuevaReserva: React.FC = () => {
  const tabs: Tab[] = [
    "Datos de la reserva",
    "Datos económicos",
    "Confirmación",
  ];
  const [activeTab, setActiveTab] = useState<Tab>("Datos de la reserva");
  const [form, setFormState] = useState<FormData>(initialForm);
  const [econ, setEconState] = useState<EconData>(initialEcon);
  const navigate = useNavigate();

  const set = (k: keyof FormData, v: any) =>
    setFormState((prev) => ({ ...prev, [k]: v }));

  const setEcon = (k: keyof EconData, v: any) =>
    setEconState((prev) => ({ ...prev, [k]: v }));

  const currentIndex = tabs.indexOf(activeTab);
  const goNext = () => {
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
  };
  const goPrev = () => {
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
  };

  const handleConfirmReserve = async () => {
    try {
      let guestId: number | undefined;

      const guest = await guestApi.getGuestByDocument(form.documentoIdentidad);

      if (guest) {
        guestId = guest.id;
      } else {
        const newGuest = await guestApi.createGuest({
          name: form.nombreCompleto,
          numberDocument: form.documentoIdentidad,
          typeDocument: form.tipoDocumento,
          country: form.pais,
          email: form.email,
          phone: form.telefono,
        });
        guestId = newGuest.id;
      }

      // ────────────────────────────────────────────────
      //  CAMBIO IMPORTANTE: Eliminar duplicados de servicios
      //  Mapeo temporal por nombre → ID (cambiar cuando tengas API de servicios)
      // ────────────────────────────────────────────────
      const serviceNameToId: Record<string, number> = {
        Tour: 1,
        Masaje: 2,
        Desayuno: 3,
        Traslado: 4,
        // Agrega aquí más servicios según tu base de datos
      };

      const serviceIds = form.serviciosAgregados
        .map((s) => serviceNameToId[s.nombre])
        .filter((id): id is number => id !== undefined);

      // Eliminar duplicados
      const uniqueServiceIds = [...new Set(serviceIds)];

      // Construir payload limpio
      const payload = {
        ...mapReservePayload(form, econ, guestId),
        serviceIds: uniqueServiceIds, // ← ¡Aquí está la corrección!
      };

      console.log("Payload LIMPIO (sin duplicados):", JSON.stringify(payload, null, 2));

      const reserve = await reserveApi.createReserve(payload);
      console.log("Reserva creada:", reserve);

      alert("Reserva creada correctamente ✅");
      navigate(`/reservas/${reserve.id}`);
    } catch (error: any) {
      console.error("Error al crear reserva:", error);
      alert(error.message || "Error al crear la reserva");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("example_user");
    if (user) {
      const parsed = JSON.parse(user);
      setFormState((prev) => ({
        ...prev,
        recepcionista: parsed.name,
      }));
    }
  }, []);

  return (
    <div className="max-h-[100vh] overflow-y-auto scroll-y-auto bg-[var(--light-bg)] p-8 font-poppins">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft
            className="text-[var(--light-text)] cursor-pointer hover:opacity-70 transition"
            size={24}
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-[24px] font-semibold text-[var(--light-text)]">
            Nueva reserva
          </h1>
        </div>

        <div className="flex bg-[var(--light-main2)] rounded-lg p-1 mb-10 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-[14px] font-medium rounded-md transition-all font-poppins ${
                activeTab === tab
                  ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] shadow-sm"
                  : "text-[var(--light-text)] hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Datos de la reserva" && (
          <DatosReservaTab form={form} set={set} />
        )}
        {activeTab === "Datos económicos" && (
          <DatosEconomicosTab
            form={form}
            set={set}
            econ={econ}
            setEcon={setEcon}
          />
        )}
        {activeTab === "Confirmación" && (
          <ConfirmacionTab form={form} econ={econ} />
        )}

        <div className="flex justify-between items-center pt-10">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-2 border border-[var(--light-outline)] rounded-full text-[var(--light-text)] hover:bg-[var(--light-main)] transition-all font-medium text-[14px] font-poppins ${
              currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <ArrowLeft size={16} /> Anterior
          </button>

          {currentIndex < tabs.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 px-8 py-2 bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] rounded-full hover:opacity-90 transition-all font-medium text-[14px] font-poppins cursor-pointer"
            >
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmReserve}
              className="flex items-center gap-2 px-8 py-2 bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] rounded-full hover:opacity-90 transition-all font-medium text-[14px] font-poppins cursor-pointer"
            >
              ✓ Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NuevaReserva;