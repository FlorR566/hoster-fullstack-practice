import React from "react";
import { RefreshCcw } from "lucide-react";

const ActividadDiaria: React.FC = () => {
  return (
    <div className="bg-[#F5F5F5] rounded-xl p-4 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="font-poppins font-medium text-[20px]"
          style={{ color: "#050534" }}
        >
          Actividad diaria
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 font-poppins font-medium text-[16px]"
          style={{ color: "#050534" }}
        >
          <RefreshCcw size={16} />
          Actualizar
        </button>
      </div>

      {/* Mini barra */}
      <div className="flex bg-[#D4D4D4] rounded-lg mb-4">
        <button
          className="flex-1 py-2 font-poppins text-sm font-medium text-[#050534] border-b-2 border-[#050534]"
        >
          Vista global
        </button>

        <button
          className="flex-1 py-2 font-poppins text-sm font-medium text-[#050534] border-b-2 border-transparent hover:border-[#050534]"
        >
          Check-In
        </button>

        <button
          className="flex-1 py-2 font-poppins text-sm font-medium text-[#050534] border-b-2 border-transparent hover:border-[#050534]"
        >
          Check-Out
        </button>
      </div>

      {/* Contenido */}
      <div className="text-slate-600">
        Contenido de actividad diaria
      </div>

    </div>
  );
};

export default ActividadDiaria;
