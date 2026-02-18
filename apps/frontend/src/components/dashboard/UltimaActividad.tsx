import React, { useState, useMemo } from "react";
import { RefreshCcw } from "lucide-react";

import dataJson from "../../data/data.json";
import type { DashboardData, UltimaActividadItem } from "../../types/dashboard";
import CardUltimasActividades from "./CardUltimasActividades";

const UltimaActividad: React.FC = () => {
    const tabs = ["Vista global", "Reservas", "Check-In", "Check-Out", "Servicios asignados"] as const;
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Vista global");

    const data = dataJson as unknown as DashboardData;
    const items: UltimaActividadItem[] = data?.ultimasActividades ?? [];

    // Filtrado por tab, usando "tipo"
    const filtered = useMemo(() => {
        if (activeTab === "Vista global") return items;

        if (activeTab === "Reservas") return items.filter((x) => x.tipo === "Nueva reserva");
        if (activeTab === "Check-In") return items.filter((x) => x.tipo === "Check-in");
        if (activeTab === "Check-Out") return items.filter((x) => x.tipo === "Check-out");
        if (activeTab === "Servicios asignados") return items.filter((x) => (x.serviciosAdicionales ?? 0) > 0);
        return items;
    }, [items, activeTab]);

    return (
        <div className="bg-[#F5F5F5] rounded-xl p-1 h-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2
                    className="font-poppins font-medium text-[20px]"
                    style={{ color: "#050534" }}
                >
                    Última actividad
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
            <div className="flex bg-[#D4D4D4] rounded-lg mb-2">
                {tabs.map((label) => (
                    <button
                        key={label}
                        onClick={() => setActiveTab(label)}
                        className={`flex-1 py-2 font-poppins text-sm font-medium text-[#050534] border-b-2 ${activeTab === label ? "border-[#050534]" : "border-transparent hover:border-[#050534]"}`} >
                        {label}
                    </button>
                ))}
            </div>

            {/* Contenido */}
            <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-2 scroll-sutil">
                {filtered.map((item) => (
                    <CardUltimasActividades key={item.reservaId} item={item} />
                ))}

                {filtered.length === 0 && (
                    <div className="py-4 text-center text-sm text-gray-500 font-poppins">
                        No hay actividad para este filtro.
                    </div>
                )}
            </div>

        </div>
    )
}

export default UltimaActividad