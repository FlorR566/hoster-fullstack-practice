import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Search, Plus, Minus, Calendar, Clock } from "lucide-react";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[14px] font-medium text-[#050534] mb-1 ml-1 font-poppins">
    {children}
  </label>
);

const InputField = ({ icon: Icon, ...props }: any) => (
  <div className="relative w-full">
    <input
      {...props}
      className={`w-full bg-[#E5E5E5] border-none rounded-lg px-3 py-2 text-[14px] text-[#050534] focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-gray-400 ${props.className || ""}`}
    />
    {Icon && <Icon size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />}
  </div>
);

const SelectField = (props: any) => (
  <select
    {...props}
    className="w-full bg-[#E5E5E5] border-none rounded-lg px-3 py-2 text-[14px] text-[#050534] focus:ring-2 focus:ring-blue-400 outline-none appearance-none"
  >
    {props.options.map((opt: any) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

const Counter = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between w-full">
    <span className="text-[13px] text-[#050534] font-light w-20">{label}</span>
    <div className="flex items-center gap-3">
      <button type="button" className="text-[#050534]"><Minus size={14} /></button>
      <span className="text-[14px] font-medium w-4 text-center">{value.toString().padStart(2, '0')}</span>
      <button type="button" className="text-[#050534]"><Plus size={14} /></button>
    </div>
  </div>
);

// ─── TAB 1: Datos de la reserva ────────────────────────────────────────────
const DatosReservaTab: React.FC = () => (
  <form className="space-y-8 text-[#050534]">

    {/* SECCIÓN 1: DATOS GENERALES — 3 columnas */}
    <div className="grid grid-cols-3 gap-x-8 gap-y-6">
      <div>
        <Label>Recepcionista</Label>
        <SelectField options={["Seleccionar", "Admin"]} />
      </div>
      <div>
        <Label>Canal de reserva</Label>
        <SelectField options={["Seleccionar", "Booking", "Directo"]} />
      </div>
      <div>
        <Label>ID de la reserva</Label>
        <InputField value="HSTR-2026-000341" disabled className="bg-[#E5E5E5]" />
      </div>
    </div>

    {/* SECCIÓN 2: DATOS DEL HUÉSPED */}
    <div>
      <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Datos del huésped</h2>
      {/* Fila 1: Nombre | País | Tipo de Documento | Documento de identidad */}
      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
        <div>
          <Label>Nombre completo</Label>
          <InputField placeholder="Juan Pérez" />
        </div>
        <div>
          <Label>País</Label>
          <SelectField options={["Seleccionar", "Argentina", "Chile"]} />
        </div>
        <div>
          <Label>Tipo de Documento</Label>
          <SelectField options={["Seleccionar", "DNI", "Pasaporte"]} />
        </div>
        <div>
          <Label>Documento de identidad</Label>
          <InputField placeholder="12345678" />
        </div>
      </div>
      {/* Fila 2: Email | Teléfono */}
      <div className="grid grid-cols-4 gap-x-8 mt-6">
        <div>
          <Label>Email</Label>
          <InputField placeholder="juan.perez@gmail.com" />
        </div>
        <div>
          <Label>Teléfono de contacto</Label>
          <InputField placeholder="12345678" />
        </div>
      </div>
    </div>

    {/* SECCIÓN 3: DATOS DE LA ESTADÍA */}
    <div>
      <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Datos de la estadía</h2>

      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
        {/* Fila 1: check-in | check-out | Cantidad noches | Cantidad personas (rowspan 2) */}
        <div>
          <Label>Fecha estimada de check-in</Label>
          <InputField type="text" placeholder="DD/MM/AAAA" icon={Calendar} />
        </div>
        <div>
          <Label>Fecha estimada de check-out</Label>
          <InputField type="text" placeholder="DD/MM/AAAA" icon={Calendar} />
        </div>
        <div>
          <Label>Cantidad de noches</Label>
          <InputField type="text" placeholder="00" />
        </div>
        {/* Cantidad de personas — ocupa 2 filas en col 4 usando row-span trick con absolute */}
        <div className="row-span-2">
          <Label>Cantidad de personas</Label>
          <div className="space-y-2 mt-1">
            <Counter label="Adultos" value={1} />
            <Counter label="Niños" value={0} />
            <Counter label="Habitaciones" value={1} />
          </div>
          <div className="mt-4">
            <Label>Ingresa con vehículo</Label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1.5 text-[14px]">
                <input type="radio" name="v" /> No
              </label>
              <label className="flex items-center gap-1.5 text-[14px]">
                <input type="radio" name="v" defaultChecked /> Si
              </label>
            </div>
          </div>
        </div>

        {/* Fila 2: hora llegada | hora checkout | vacío | (col 4 = row-span arriba) */}
        <div>
          <Label>Hora estimada de llegada</Label>
          <InputField type="text" placeholder="14:00" icon={Clock} />
        </div>
        <div>
          <Label>Hora estimada de check-out</Label>
          <InputField type="text" placeholder="14:00" icon={Clock} />
        </div>
        <div /> {/* spacer col 3 */}

        {/* Fila 3: Tipo alojamiento | Número alojamiento */}
        <div>
          <Label>Tipo de alojamiento</Label>
          <SelectField options={["Seleccionar", "Habitación", "Suite"]} />
        </div>
        <div>
          <Label>Número de alojamiento</Label>
          <InputField placeholder="03" />
        </div>
      </div>
    </div>

    {/* SECCIÓN 4: SERVICIOS ADICIONALES + ESTACIONAMIENTO */}
    <div>
      <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Servicios adicionales</h2>
      <div className="flex gap-16">

        {/* Mitad izquierda: buscador + lista */}
        <div className="flex-1 space-y-3">
          <div>
            <Label>Buscar servicios</Label>
            <InputField placeholder="Buscar" icon={Search} />
          </div>
          <div className="space-y-2">
            <p className="text-[14px] font-medium mt-1">Servicios agregados</p>
            <div className="bg-[#E5E5E5] rounded-lg px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-[13px] font-medium">Servicio 1</p>
                <p className="text-[11px] text-gray-500">00 USD</p>
              </div>
              <Minus size={14} className="cursor-pointer shrink-0" />
            </div>
            <div className="bg-[#E5E5E5] rounded-lg px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-[13px] font-medium">Servicio 2</p>
                <p className="text-[11px] text-gray-500">00 USD</p>
              </div>
              <Minus size={14} className="cursor-pointer shrink-0" />
            </div>
          </div>
        </div>

        {/* Mitad derecha: estacionamiento + patente */}
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <Label>Estacionamiento incluido</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-1.5 text-[14px]">
                <input type="radio" name="p" /> No
              </label>
              <label className="flex items-center gap-1.5 text-[14px]">
                <input type="radio" name="p" defaultChecked /> Si
              </label>
            </div>
          </div>
          <div className="max-w-[200px]">
            <Label>Patente</Label>
            <InputField placeholder="AA 342 ZQ" />
          </div>
        </div>

      </div>
    </div>

  </form>
);

// ─── TAB 2: Datos Económicos ────────────────────────────────────────────────
const DatosEconomicosTab: React.FC = () => (
  <div className="space-y-10 text-[#050534]">

    <div>
      <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Datos económicos</h2>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <div>
          <Label>Precio por noche</Label>
          <InputField placeholder="00 USD" />
        </div>
        <div>
          <Label>Precio total de noches</Label>
          <InputField placeholder="00 USD" />
        </div>
        <div>
          <Label>Total estimado de la estadía</Label>
          <InputField placeholder="00 USD" />
        </div>
        <div>
          <Label>Precio total de servicios</Label>
          <InputField placeholder="00 USD" />
        </div>
        <div className="col-span-2">
          <Label>Servicios agregados</Label>
          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
            <div className="bg-[#E5E5E5] rounded-lg px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-[13px] font-medium">Servicio 1</p>
                <p className="text-[11px] text-gray-500">00 USD</p>
              </div>
              <Minus size={14} className="cursor-pointer" />
            </div>
            <div className="bg-[#E5E5E5] rounded-lg px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-[13px] font-medium">Servicio 2</p>
                <p className="text-[11px] text-gray-500">00 USD</p>
              </div>
              <Minus size={14} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Forma de pago</h2>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <div>
          <Label>Medio de pago</Label>
          <SelectField options={["Seleccionar", "Efectivo", "Tarjeta de crédito", "Transferencia"]} />
        </div>
        <div>
          <Label>Estado de pago</Label>
          <div className="flex flex-col gap-1 mt-2">
            <label className="flex items-center gap-2 text-[14px]">
              <input type="radio" name="estadoPago" value="parcial" /> Parcial
            </label>
            <label className="flex items-center gap-2 text-[14px]">
              <input type="radio" name="estadoPago" value="total" defaultChecked /> Total
            </label>
          </div>
        </div>
        <div />
        <div>
          <Label>Monto que abona ahora</Label>
          <InputField placeholder="00 USD" />
        </div>
        <div>
          <Label>Saldo pendiente</Label>
          <InputField placeholder="00 USD" />
        </div>
        <div>
          <Label>Número de recibo/transacción</Label>
          <InputField placeholder="1487" />
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Observaciones</h2>
      <div>
        <Label>Nota del recepcionista</Label>
        <textarea
          placeholder="Escribe aquí"
          rows={4}
          className="w-full max-w-[340px] bg-[#E5E5E5] border-none rounded-lg px-3 py-2 text-[14px] text-[#050534] focus:ring-2 focus:ring-blue-400 outline-none resize-none placeholder:text-gray-400"
        />
      </div>
    </div>
  </div>
);

// ─── TAB 3: Confirmación ────────────────────────────────────────────────────
const Row = ({ label, value }: { label: string; value: string }) => (
  <p className="text-[13px] text-[#050534]">
    <span className="font-semibold">{label}:</span>{"  "}{value}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[15px] font-bold uppercase tracking-wide mt-6 mb-3">{children}</h2>
);

const ConfirmacionTab: React.FC = () => (
  <div className="text-[#050534] space-y-1 max-w-2xl">

    <h2 className="text-[18px] font-bold mb-4">Confirmación</h2>

    <Row label="Recepcionista" value="Laura Pérez" />
    <Row label="Canal" value="Venta telefónica" />
    <Row label="ID de la reserva" value="HSTR-2026-000341" />

    <SectionTitle>Datos del huésped</SectionTitle>
    <Row label="Nombre completo" value="Juan Gómez" />
    <Row label="País" value="Argentina" />
    <Row label="Tipo de documento" value="DNI" />
    <Row label="Número de identidad" value="12345678" />
    <Row label="Email" value="juan.gomez@gmail.com" />
    <Row label="Teléfono de contacto" value="+54 9 261123456" />

    <SectionTitle>Datos de la estadía</SectionTitle>
    <Row label="Fecha estimada de check-in" value="02/02/2026" />
    <Row label="Fecha estimada de check-out" value="20/02/2026" />
    <Row label="Cantidad de noches" value="18" />
    <Row label="Cantidad de adultos" value="02" />
    <Row label="Cantidad de niños" value="00" />
    <Row label="Cantidad de habitaciones" value="01" />
    <Row label="Hora estimada de llegada" value="14:30" />
    <Row label="Hora estimada de salida" value="09:30" />
    <Row label="Ingresa con vehículo" value="Si" />
    <Row label="Tipo de alojamiento" value="Habitación Deluxe" />
    <Row label="Número de alojamiento" value="03" />

    <SectionTitle>Servicios adicionales</SectionTitle>
    <Row label="Servicios adicionales seleccionados" value="02" />
    <Row label="Servicio 1" value="20 USD" />
    <Row label="Servicio 2" value="30 USD" />
    <Row label="Estacionamiento incluido" value="Si" />
    <Row label="Patente" value="AA 342 ZQ" />

    <SectionTitle>Datos económicos</SectionTitle>
    <Row label="Precio por noche" value="100 USD" />
    <Row label="Precio total por noche" value="1800 USD" />
    <Row label="Precio por servicios" value="50 USD" />
    <Row label="Servicio 1" value="20 USD" />
    <Row label="Servicio 2" value="30 USD" />
    <Row label="Total estimado de la estadía" value="1850 USD" />

    <SectionTitle>Forma de pago</SectionTitle>
    <Row label="Medio de pago" value="Tarjeta de crédito" />
    <Row label="Estado del pago" value="Total" />
    <Row label="Monto que abona ahora" value="1850 USD" />
    <Row label="Monto pendiente" value="00 USD" />
    <Row label="Número de recibo/transacción" value="1478" />

    <SectionTitle>Observaciones</SectionTitle>
    <Row label="Nota del recepcionista" value="Habitación silenciosa" />

  </div>
);

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
type Tab = "Datos de la reserva" | "Datos económicos" | "Confirmación";

const NuevaReserva: React.FC = () => {
  const tabs: Tab[] = ["Datos de la reserva", "Datos económicos", "Confirmación"];
  const [activeTab, setActiveTab] = useState<Tab>("Datos de la reserva");

  const currentIndex = tabs.indexOf(activeTab);

  const goNext = () => {
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
  };

  const goPrev = () => {
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8 font-poppins">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft className="text-[#050534] cursor-pointer" size={24} />
          <h1 className="text-[24px] font-semibold text-[#050534]">Nueva reserva</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-10 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-[14px] font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#050534] text-[#050534]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Datos de la reserva" && <DatosReservaTab />}
        {activeTab === "Datos económicos" && <DatosEconomicosTab />}
        {activeTab === "Confirmación" && <ConfirmacionTab />}

        {/* Botones de Navegación */}
        <div className="flex justify-between items-center pt-10">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-2 border border-[#050534] rounded-full text-[#050534] hover:bg-[#050534] hover:text-white transition-all font-medium text-[14px] ${
              currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <ArrowLeft size={16} /> Anterior
          </button>

          {currentIndex < tabs.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 px-8 py-2 bg-[#050534] text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-[14px]"
            >
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 px-8 py-2 bg-[#050534] text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-[14px]"
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