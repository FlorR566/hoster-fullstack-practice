import React, { useState } from "react";
import { Button } from "../common/Button";
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
      className={`w-full bg-[#E5E5E5] border-none rounded-lg px-3 py-2 text-[14px] text-[#050534] focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-gray-400 ${props.className}`}
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
  <div className="flex items-center justify-between w-full max-w-[120px]">
    <span className="text-[13px] text-[#050534] font-light">{label}</span>
    <div className="flex items-center gap-2">
      <button type="button" className="text-[#050534]"><Minus size={14} /></button>
      <span className="text-[14px] font-medium w-4 text-center">{value.toString().padStart(2, '0')}</span>
      <button type="button" className="text-[#050534]"><Plus size={14} /></button>
    </div>
  </div>
);


const NuevaReserva: React.FC = () => {
  const tabs = ["Datos de la reserva", "Datos económicos", "Confirmación"] as const;
  const [activeTab] = useState("Datos de la reserva");

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8 font-poppins">
      <div className="max-w-6xl mx-auto bg-[#F5F5F5]">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft className="text-[#050534] cursor-pointer" size={24} />
          <h1 className="text-[24px] font-semibold text-[#050534]">Nueva reserva</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 max-w-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-1.5 text-[14px] font-medium rounded-t-md transition-all border-b-2 ${
                activeTab === tab 
                ? "border-[#050534] text-[#050534]" 
                : "border-gray-300 text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="space-y-10 text-[#050534]">
          
          {/* SECCIÓN 1: DATOS GENERALES */}
          <div className="grid grid-cols-3 gap-x-12 gap-y-6">
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
              <InputField value="HSTR-2026-000341" disabled className="bg-white border border-gray-200" />
            </div>
          </div>

          {/* SECCIÓN 2: DATOS DEL HUÉSPED */}
          <div>
            <h2 className="text-[18px] font-bold mb-4 uppercase tracking-wide">Datos del huésped</h2>
            <div className="grid grid-cols-3 gap-x-12 gap-y-6">
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
                <Label>Email</Label>
                <InputField placeholder="juan.perez@gmail.com" />
              </div>
              <div>
                <Label>Teléfono de contacto</Label>
                <InputField placeholder="12345678" />
              </div>
              <div>
                <Label>Documento de identidad</Label>
                <InputField placeholder="12345678" />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: ESTADÍA */}
          <div>
            <h2 className="text-[18px] font-bold mb-4 uppercase tracking-wide">Datos de la estadía</h2>
            <div className="grid grid-cols-3 gap-x-12 gap-y-6">
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
                <InputField type="number" placeholder="00" />
              </div>
              <div>
                <Label>Hora estimada de llegada</Label>
                <InputField type="text" placeholder="14:00" icon={Clock} />
              </div>
              <div>
                <Label>Hora estimada de check-out</Label>
                <InputField type="text" placeholder="14:00" icon={Clock} />
              </div>
              
              {/* Cantidad de personas */}
              <div>
                <Label>Cantidad de personas</Label>
                <div className="space-y-2">
                  <Counter label="Adultos" value={1} />
                  <Counter label="Niños" value={0} />
                  <Counter label="Habitaciones" value={1} />
                </div>
              </div>

              <div>
                <Label>Tipo de alojamiento alojamiento</Label>
                <SelectField options={["Seleccionar", "Habitación", "Suite"]} />
              </div>
              <div>
                <Label>Número de alojamiento</Label>
                <InputField placeholder="03" />
              </div>
              <div>
                <Label>Ingresa con vehículo</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-[14px]"><input type="radio" name="v" /> No</label>
                  <label className="flex items-center gap-2 text-[14px]"><input type="radio" name="v" defaultChecked /> Si</label>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: SERVICIOS Y ESTACIONAMIENTO */}
          <div className="grid grid-cols-3 gap-x-12">
            <div>
              <h2 className="text-[18px] font-bold mb-4 uppercase tracking-wide">Servicios adicionales</h2>
              <Label>Buscar servicios</Label>
              <div className="relative">
                <InputField placeholder="Buscar" />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              
              <div className="mt-4 space-y-3">
                <p className="text-[14px] font-medium">Servicios agregados</p>
                <div className="bg-[#E5E5E5] rounded-lg p-3 flex justify-between items-center">
                  <span className="text-[13px]">Servicio 1 <br/> <span className="text-[11px] text-gray-500">00 USD</span></span>
                  <Minus size={14} className="cursor-pointer" />
                </div>
                <div className="bg-[#E5E5E5] rounded-lg p-3 flex justify-between items-center">
                  <span className="text-[13px]">Servicio 2 <br/> <span className="text-[11px] text-gray-500">00 USD</span></span>
                  <Minus size={14} className="cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <h2 className="text-[18px] font-bold mb-4 invisible">Espaciador</h2>
              <Label>Estacionamiento incluido</Label>
              <div className="flex gap-4 mt-2 mb-6">
                <label className="flex items-center gap-2 text-[14px]"><input type="radio" name="p" /> No</label>
                <label className="flex items-center gap-2 text-[14px]"><input type="radio" name="p" defaultChecked /> Si</label>
              </div>
              <Label>Patente</Label>
              <InputField placeholder="AA 342 ZQ" />
            </div>
          </div>

          {/* Botones de Navegación */}
          <div className="flex justify-between items-center pt-10">
            <button type="button" className="flex items-center gap-2 px-6 py-2 border border-[#050534] rounded-full text-[#050534] hover:bg-[#050534] hover:text-white transition-all font-medium text-[14px]">
              <ArrowLeft size={16} /> Anterior
            </button>
            <button type="button" className="flex items-center gap-2 px-8 py-2 bg-[#050534] text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-[14px]">
              Siguiente <ArrowRight size={16} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NuevaReserva;