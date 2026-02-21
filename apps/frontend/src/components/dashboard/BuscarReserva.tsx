import React from "react";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const BuscarReserva: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Buscar",
}) => {
  return (
    <div className="bg-[var(--light-card)] border border-[var(--light-outline)] rounded-2xl p-5 w-full">
      <h2 className="font-poppins font-semibold text-[20px] text-[var(--light-text)] mb-3">
        Buscar reserva
      </h2>

      {/* Input */}
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full h-[44px]
            rounded-lg
            bg-[var(--light-main2)]
            px-4 pr-12
            font-poppins text-[16px]
            text-[var(--light-text)]
            placeholder:text-[var(--light-placeholder)]
            outline-none
            border border-transparent
            focus:border-[var(--light-accent)]
            focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)]
            transition
          "
        />

        <button
          type="button"
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-[var(--light-text)]
            opacity-80 hover:opacity-100
            transition
          "
          title="Buscar"
          onClick={() => console.log("buscar:", value)}
        >
          <Search size={18} />
        </button>
      </div>

      <p className="mt-2 font-poppins text-[12px] font-normal text-[var(--light-text)] opacity-80">
        Por ID, nombre del huésped o documento de identidad
      </p>
    </div>
  );
};

export default BuscarReserva;