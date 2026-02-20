import React from "react";
import DashboardActions from "./DashboardActions";

const AccionesRapidas: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 w-full">
      {/* 60% */}
      <div className="border border-slate-200 rounded-xl p-4 bg-[var(--card)] shadow-sm">
        Buscando a nemo
      </div>

      {/* 40% */}
      <div className="p-4">
        <DashboardActions />
      </div>
    </div>
  );
};

export default AccionesRapidas;