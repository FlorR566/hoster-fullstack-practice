import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import BaseModalFormulario, {
  FormField,
  FormSelect,
  FormTextarea,
  FormRadioGroup,
} from "./BaseModalFormulario";

export interface NuevoIncidente {
  numeroReserva: string;
  nombreHuesped: string;
  nombreRecepcionista: string;
  fechaOcurrencia: string;
  horaOcurrencia: string;
  tipoIncidente: string;
  descripcion: string;
  recibeCompensacion: "no" | "si" | "";
  compensacion?: string;
}

interface ReportarIncidenteModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroReserva?: string;
  nombreHuesped?: string;
  onConfirm?: (data: NuevoIncidente) => void;
}

const TIPOS_INCIDENTE = [
  { value: "Overbooking", label: "Overbooking" },
  { value: "Equipamiento Roto", label: "Equipamiento Roto" },
  { value: "Fallo en servicios basicos", label: "Fallo en servicios básicos" },
  { value: "Queja de cliente", label: "Queja de cliente" },
  { value: "Otro", label: "Otro" },
];

const ReportarIncidenteModal: React.FC<ReportarIncidenteModalProps> = ({
  isOpen,
  onClose,
  numeroReserva = "HSTR-2026-000341",
  nombreHuesped = "Juan Perez",
  onConfirm,
}) => {
  const [form, setForm] = useState<NuevoIncidente>({
    numeroReserva,
    nombreHuesped,
    nombreRecepcionista: "",
    fechaOcurrencia: "",
    horaOcurrencia: "",
    tipoIncidente: "",
    descripcion: "",
    recibeCompensacion: "",
    compensacion: "",
  });

  React.useEffect(() => {
    if (isOpen) {
      setForm({
        numeroReserva,
        nombreHuesped,
        nombreRecepcionista: "",
        fechaOcurrencia: "",
        horaOcurrencia: "",
        tipoIncidente: "",
        descripcion: "",
        recibeCompensacion: "",
        compensacion: "",
      });
    }
  }, [isOpen, numeroReserva, nombreHuesped]);

  const set = (key: keyof NuevoIncidente) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleConfirm = () => {
    onConfirm?.(form);
    onClose();
  };

  return (
    <BaseModalFormulario
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Reportar Incidente"
      icon={<AlertCircle size={18} />}
      cancelText="Cancelar"
      confirmText="Confirmar"
    >

      <FormField
        label="Número de reserva"
        value={form.numeroReserva}
        readOnly
      />

      <FormField
        label="Nombre del huésped"
        value={form.nombreHuesped}
        readOnly
      />

      <FormSelect
        label="Nombre del recepcionista"
        value={form.nombreRecepcionista}
        onChange={set("nombreRecepcionista")}
        options={[
          { value: "Laura Martinez", label: "Laura Martinez" },
          { value: "Carlos Ruiz", label: "Carlos Ruiz" },
          { value: "Ana Torres", label: "Ana Torres" },
        ]}
        placeholder="Seleccionar"
      />

      {/* Fecha de ocurrencia */}
      <FormField
        label="Fecha de ocurrencia"
        value={form.fechaOcurrencia}
        onChange={set("fechaOcurrencia")}
        type="date"
        placeholder="DD/MM/AAAA"
      />

      {/* Hora de ocurrencia */}
      <FormField
        label="Hora de ocurrencia"
        value={form.horaOcurrencia}
        onChange={set("horaOcurrencia")}
        type="time"
        placeholder="00:00"
      />

      {/* Tipo de incidente */}
      <FormSelect
        label="Tipo de incidente"
        value={form.tipoIncidente}
        onChange={set("tipoIncidente")}
        options={TIPOS_INCIDENTE}
        placeholder="Seleccionar"
      />

      {/* Descripción */}
      <FormTextarea
        label="Descripción del incidente"
        value={form.descripcion}
        onChange={set("descripcion")}
        placeholder="Descripción"
        rows={5}
      />

      <FormRadioGroup
        label="¿Recibe compensación?"
        name="nueva-compensacion"
        options={[
          { value: "no", label: "No" },
          { value: "si", label: "Si" },
        ]}
        value={form.recibeCompensacion}
        onChange={set("recibeCompensacion")}
      />

      {/* Campo de compensación condicional */}
      {form.recibeCompensacion === "si" && (
        <FormField
          label="Detalle de compensación"
          value={form.compensacion}
          onChange={set("compensacion")}
          placeholder="Descripción de la compensación..."
        />
      )}
    </BaseModalFormulario>
  );
};

export default ReportarIncidenteModal;