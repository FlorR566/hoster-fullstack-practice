import React, { useState, useMemo } from 'react'
import { RefreshCcw } from "lucide-react";
import dataJson from "../../data/data.json";
import CardMantenimiento from './CardMantenimiento';
import { MaintenanceItem } from '@/src/types/dashboard';

const Mantenimiento: React.FC = () => {
    const tabs = ["Vista global", "Limpieza", "Mantenimiento"] as const
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Vista global")

    const mantenimiento = (dataJson as any)?.mantenimiento;

 const items: MaintenanceItem[] = Array.isArray(mantenimiento?.items)
    ? mantenimiento.items
    : [];

  const filteredItems = useMemo(() => {
    if (activeTab === "Vista global") return items;
    return items.filter((it) => String(it.tipo) === activeTab);
  }, [items, activeTab]);

    return (
        <div className="bg-[#F5F5F5] rounded-xl p-1 h-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2
                    className="font-poppins font-medium text-[20px]"
                    style={{ color: "#050534" }}
                >
                    Mantenimiento
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
                        type="button"
                        className={`flex-1 py-2 font-poppins text-sm font-medium text-[#050534] border-b-2 ${activeTab === label
                                ? "border-[#050534]"
                                : "border-transparent hover:border-[#050534]"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Contenido */}
       {/* Contenido */}
      <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-2 scroll-sutil">
        {filteredItems.map((item) => (
          <CardMantenimiento key={item.id} item={item} />
        ))}

        {filteredItems.length === 0 && (
          <div className="py-4 text-center text-sm text-gray-500 font-poppins">
            No hay actividad para este filtro.
          </div>
        )}
      </div>

        </div>
    )
}

export default Mantenimiento