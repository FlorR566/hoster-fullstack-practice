/**
 * BaseModalVerMas.tsx
 * Ubicación: src/components/common/modals/BaseModalVerMas.tsx
 */

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface BaseModalVerMasProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  closeButtonText?: string;
}

const BaseModalVerMas: React.FC<BaseModalVerMasProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  closeButtonText = "Dejar de ver",
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-[680px]
          max-h-[90dvh] flex flex-col
          bg-[var(--light-bg)]
          rounded-2xl shadow-2xl
          font-poppins
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado fijo */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-[var(--light-text)] opacity-80">{icon}</span>
            )}
            <h2 className="text-[17px] font-semibold text-[var(--light-text)]">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--light-text)] opacity-60 hover:opacity-100 transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex flex-col gap-4 overflow-y-auto px-6 pb-2 flex-1 scroll-sutil">
          {children}
        </div>

        {/* Botón cierre fijo */}
        <div className="flex justify-end px-6 py-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[var(--light-accent)] text-white text-[13px] font-medium hover:opacity-90 transition cursor-pointer"
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────── Helpers ────────────────────────── */

export const ModalRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
);

/**
 * Input editable con label.
 * El label puede ser un string vacío " " (espacio) para reservar la altura del label
 * y alinear verticalmente campos que están en la misma fila pero con labels de distinta longitud.
 */
export const ModalField: React.FC<{
  label: string;
  value: string;
  fullWidth?: boolean;
  type?: string;
  /** Si true, renderiza un label invisible para mantener alineación vertical */
  spacerLabel?: boolean;
}> = ({ label, value, fullWidth, type = "text", spacerLabel = false }) => (
  <div className={fullWidth ? "sm:col-span-2" : ""}>
    {/* Siempre renderizamos el label para mantener la altura consistente entre columnas */}
    <label
      className="block text-[12px] mb-1"
      style={{
        color: spacerLabel ? "transparent" : "var(--light-text)",
        opacity: spacerLabel ? 0 : 0.6,
        userSelect: spacerLabel ? "none" : undefined,
        pointerEvents: spacerLabel ? "none" : undefined,
      }}
      aria-hidden={spacerLabel}
    >
      {spacerLabel ? "\u00A0" : label}
    </label>
    <input
      type={type}
      defaultValue={value}
      style={{
        width: "100%",
        padding: "8px 12px",
        borderRadius: "8px",
        fontSize: "13px",
        color: "var(--light-text)",
        backgroundColor: "var(--light-input)",
        border: "none",
        outline: "none",
        boxShadow: "none",
        WebkitAppearance: "none",
        colorScheme: "normal",
      }}
    />
  </div>
);

/**
 * Textarea editable para descripciones largas.
 * Sin borde, fondo --light-input.
 */
export const ModalTextarea: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <div>
    <label
      className="block text-[12px] mb-1"
      style={{ color: "var(--light-text)", opacity: 0.6 }}
    >
      {label}
    </label>
    <textarea
      defaultValue={value}
      rows={5}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        fontSize: "13px",
        color: "var(--light-text)",
        backgroundColor: "var(--light-input)",
        border: "none",
        outline: "none",
        resize: "none",
        lineHeight: "1.6",
        boxShadow: "none",
      }}
    />
  </div>
);

export default BaseModalVerMas;