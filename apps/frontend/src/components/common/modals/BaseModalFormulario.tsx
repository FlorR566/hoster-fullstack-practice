import React, { useEffect } from "react";
import { X } from "lucide-react";

interface BaseModalFormularioProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
}

const BaseModalFormulario: React.FC<BaseModalFormularioProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  icon,
  children,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  confirmDisabled = false,
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
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="
          relative w-full
          flex flex-col
          bg-[var(--light-bg)]
          rounded-2xl shadow-2xl
          font-poppins
        "
        style={{
          maxWidth: "420px",
          maxHeight: "90dvh",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header  */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            {icon && (
              <span style={{ color: "var(--light-text)", opacity: 0.8 }}>{icon}</span>
            )}
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "var(--light-text)",
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--light-text)",
              opacity: 0.6,
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Contenido scrolleable ── */}
        <div
          className="scroll-sutil"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 24px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {children}
        </div>

        {/* ── Footer  ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "16px 24px",
            flexShrink: 0,
          }}
        >
          <FormButton variant="secondary" onClick={onClose}>
            {cancelText}
          </FormButton>
          <FormButton variant="primary" onClick={onConfirm} disabled={confirmDisabled}>
            {confirmText}
          </FormButton>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Helpers reutilizables para formularios
// ─────────────────────────────────────────────

export const FormButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}> = ({ children, onClick, variant = "primary", disabled = false, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "8px 22px",
      borderRadius: "9999px",
      fontSize: "13px",
      fontWeight: 500,
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "opacity 0.15s",
      backgroundColor:
        variant === "primary" ? "var(--light-accent)" : "var(--light-input)",
      color:
        variant === "primary" ? "#ffffff" : "var(--light-text)",
    }}
    onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.opacity = "0.85"; }}
    onMouseLeave={(e) => { e.currentTarget.style.opacity = disabled ? "0.5" : "1"; }}
  >
    {children}
  </button>
);

/** Campo de texto/fecha/hora/email */
export const FormField: React.FC<{
  label: string;
  value?: string;
  onChange?: (val: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
}> = ({ label, value, onChange, type = "text", placeholder = "", readOnly = false }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <label style={{ fontSize: "12px", color: "var(--light-text)", opacity: 0.6 }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
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
        cursor: readOnly ? "default" : "text",
        boxSizing: "border-box",
      }}
    />
  </div>
);

/** Select */
export const FormSelect: React.FC<{
  label: string;
  value?: string;
  onChange?: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}> = ({ label, value, onChange, options, placeholder = "Seleccionar" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <label style={{ fontSize: "12px", color: "var(--light-text)", opacity: 0.6 }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 32px 8px 12px",
          borderRadius: "8px",
          fontSize: "13px",
          color: value ? "var(--light-text)" : "var(--light-placeholder)",
          backgroundColor: "var(--light-input)",
          border: "none",
          outline: "none",
          appearance: "none",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          fontSize: "10px",
          color: "var(--light-text)",
          opacity: 0.6,
        }}
      >
        ▾
      </span>
    </div>
  </div>
);

export const FormTextarea: React.FC<{
  label: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder = "", rows = 5 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <label style={{ fontSize: "12px", color: "var(--light-text)", opacity: 0.6 }}>
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        fontSize: "13px",
        color: "var(--light-text)",
        backgroundColor: "var(--light-input)",
        border: "none",
        outline: "none",
        resize: "none",
        lineHeight: "1.6",
        boxSizing: "border-box",
      }}
    />
  </div>
);

export const FormRadioGroup: React.FC<{
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (val: string) => void;
}> = ({ label, name, options, value, onChange }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <span style={{ fontSize: "13px", color: "var(--light-text)" }}>{label}</span>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {options.map((opt) => (
        <label
          key={opt.value}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "var(--light-text)",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            style={{ accentColor: "var(--light-accent)" }}
          />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);

export default BaseModalFormulario;