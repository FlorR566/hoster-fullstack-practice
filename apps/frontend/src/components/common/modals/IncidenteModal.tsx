import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import BaseModalVerMas, { ModalRow, ModalField, ModalTextarea } from "./BaseModalVerMas";

export interface IncidenteDetalle {
  numeroReserva: string;
  nombreHuesped: string;
  fechaIncidente: string;
  horaIncidente: string;
  tipoIncidente: string;
  nombreRecepcionista: string;
  descripcion: string;
  recibeCompensacion: boolean;
  compensacion?: string;
}

interface IncidenteModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidente: IncidenteDetalle | null;
}

const IncidenteModal: React.FC<IncidenteModalProps> = ({ isOpen, onClose, incidente }) => {
  const [compensacion, setCompensacion] = useState<boolean>(
    incidente?.recibeCompensacion ?? false
  );

  React.useEffect(() => {
    setCompensacion(incidente?.recibeCompensacion ?? false);
  }, [incidente]);

  if (!incidente) return null;

  return (
    <BaseModalVerMas
      isOpen={isOpen}
      onClose={onClose}
      title="Incidente"
      icon={<AlertCircle size={18} />}
      closeButtonText="Dejar de ver"
    >
      <ModalRow>
        <ModalField label="Numero de reserva" value={incidente.numeroReserva} />
        <ModalField label="Nombre del huésped" value={incidente.nombreHuesped} />
      </ModalRow>

      <ModalRow>
        <ModalField
          label="Fecha y hora donde ocurrio el incidente"
          value={incidente.fechaIncidente}
          type="date"
        />
        <ModalField
          label="hora"
          spacerLabel={true}
          value={incidente.horaIncidente}
          type="time"
        />
      </ModalRow>

      <ModalRow>
        <ModalField label="Tipo de incidente" value={incidente.tipoIncidente} />
        <ModalField label="Nombre del recepcionista" value={incidente.nombreRecepcionista} />
      </ModalRow>

      <ModalTextarea label="Descripcion del incidente" value={incidente.descripcion} />

      <div>
        <p
          className="mb-2"
          style={{ fontSize: "13px", color: "var(--light-text)" }}
        >
          ¿Recibe compensación?
        </p>
        <div className="flex flex-col gap-1">
          <label
            className="flex items-center gap-2 cursor-pointer"
            style={{ fontSize: "13px", color: "var(--light-text)" }}
          >
            <input
              type="radio"
              name="compensacion-view"
              checked={!compensacion}
              onChange={() => setCompensacion(false)}
              className="accent-[var(--light-accent)]"
            />
            No
          </label>
          <label
            className="flex items-center gap-2 cursor-pointer"
            style={{ fontSize: "13px", color: "var(--light-text)" }}
          >
            <input
              type="radio"
              name="compensacion-view"
              checked={compensacion}
              onChange={() => setCompensacion(true)}
              className="accent-[var(--light-accent)]"
            />
            Si
          </label>
        </div>

        {compensacion && (
          <input
            type="text"
            defaultValue={incidente.compensacion ?? ""}
            placeholder="Descripción de la compensación..."
            style={{
              marginTop: "8px",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              color: "var(--light-text)",
              backgroundColor: "var(--light-input)",
              border: "none",
              outline: "none",
              boxShadow: "none",
              width: "100%",
            }}
          />
        )}
      </div>
    </BaseModalVerMas>
  );
};

export default IncidenteModal;