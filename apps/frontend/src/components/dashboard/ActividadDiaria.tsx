import React, { useState, useMemo } from "react";
import { RefreshCcw, ArrowUpRight } from "lucide-react";
import CardActividadDiaria from "./CardActividadDiaria";
import dataJson from "../../data/data.json"
import type { DashboardData, ActividadDiariaItem } from "../../types/dashboard";

const ActividadDiaria: React.FC = () => {
  const tabs = ["Vista global", "Check-In", "Check-Out", "Servicios asignados"] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Vista global")

  const data = dataJson as unknown as DashboardData;
  const items: ActividadDiariaItem[] = data?.actividadDiaria ?? [];

  const filtered = useMemo(() => {
    if (activeTab === "Vista global") return items;

    if (activeTab === "Check-In")
      return items.filter((x) => x.estado === "Check-in");

    if (activeTab === "Check-Out")
      return items.filter((x) => x.estado === "Check-out");

    if (activeTab === "Servicios asignados")
      return items.filter((x) => (x.serviciosAdicionales.cantidad ?? 0) >= 1);

    return items;
  }, [activeTab, items]);

  return (
    <div className="bg-[var(--light-card)] rounded-xl p-1 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2
          className="font-poppins font-medium text-[20px] text-[var(--light-text)]"
        >
          Actividad diaria

          <button
            type="button"
            title="Actualizar"
            className="ml-3 p-1 bg-[var(--light-main)] rounded-md"
            onClick={() => { console.log("refresh actividad diaria") }}
          >
            <RefreshCcw size={16} />
          </button>
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 font-poppins font-medium text-[16px] text-[var(--light-text)]"
        >
          <ArrowUpRight size={16} />
          Ver más
        </button>
      </div>

      {/* Mini barra */}
      <div className="flex bg-[var(--light-main2)] rounded-lg p-1 mb-2">
        {tabs.map((label) => {
          const isActive = activeTab === label;

          return (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex-1 py-2 font-poppins text-sm font-medium rounded-md transition  ${isActive ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] shadow-sm" : "text-[var(--light-text)] hover:bg-white/10"}`}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-2 scroll-sutil">
        {filtered.map((item) => (
          <CardActividadDiaria key={item.reservaId} item={item} />
        ))}

        {filtered.length === 0 && (
          <div className="py-4 text-center text-sm text-gray-500 font-poppins">
            No hay actividad para este filtro.
          </div>
        )}
      </div>

    </div>
  );
};

export default ActividadDiaria;
