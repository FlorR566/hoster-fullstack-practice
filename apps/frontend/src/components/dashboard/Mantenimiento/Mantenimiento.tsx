import React, { useState, useMemo, useEffect } from "react";
import type { MaintenanceItem } from "@/src/types/dashboard";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import { filterByTab } from "@/src/utils/filterByTab";
import DashboardCardHeader from "../../common/header/DashboardCardHeader";
import MantenimientoList from "./MantenimientoList";
import MantenimientoModal from "./MantenimientoModal";
import { getAllMaintenanceReports } from "../../../api/maintenanceApi";

const Mantenimiento: React.FC = () => {
  const tabs = ["Vista global", "Limpieza", "Mantenimiento"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Vista global");
  const [openModal, setOpenModal] = useState(false);
  const [items, setItems] = useState<MaintenanceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMaintenanceReports()
      .then((reports) => {
        const mapped: MaintenanceItem[] = reports.map((r: any) => {
          const idStr = String(r.id || "");
          let tipoReal = "Mantenimiento";

          if (idStr.startsWith("L")) {
            tipoReal = "Limpieza";
          } else if (idStr.startsWith("M")) {
            tipoReal = "Mantenimiento";
          }
          // si no tiene prefijo → se queda como Mantenimiento (o puedes poner "Desconocido")

          return {
            id: idStr,
            lugar: r.roomId,
            tipo: tipoReal,
            estado: r.status,
            duracionEstimada: r.duration,
            responsable: r.owner,
          };
        });

        setItems(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = useMemo(() => {
    return filterByTab(
      items,
      activeTab,
      {
        Limpieza: (it) => String(it.tipo) === "Limpieza",
        Mantenimiento: (it) => String(it.tipo) === "Mantenimiento",
      },
      "Vista global"
    );
  }, [items, activeTab]);

  const lastFive = useMemo(() => filteredItems.slice(0, 5), [filteredItems]);

  return (
    <div className="bg-[var(--card)] rounded-xl p-1 h-full">
      <DashboardCardHeader
        title="Mantenimiento"
        onRefresh={() => window.location.reload()}
        onViewMore={() => setOpenModal(true)}
      />
      <MiniBarTabs
        tabs={tabs}
        value={activeTab}
        onChange={setActiveTab}
        className="mb-2"
      />
      {loading ? (
        <p className="p-4 text-center">Cargando mantenimiento...</p>
      ) : (
        <MantenimientoList items={lastFive} maxHeightClassName="max-h-[420px]" />
      )}
      <MantenimientoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        items={filteredItems}
      />
    </div>
  );
};

export default Mantenimiento;