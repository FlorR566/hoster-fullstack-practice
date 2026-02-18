import React, { useState, useEffect } from "react";
import { User } from "../types";
import { Button } from "../components/common/Button";
import { getAIGreeting } from "../services/service";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import ActividadDiaria from "../components/dashboard/ActividadDiaria";
import UltimaActividad from "../components/dashboard/UltimaActividad";
import DashboardActions from "../components/dashboard/DashboardActions";
import Mantenimiento from "../components/dashboard/Mantenimiento";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const demoUser: User = {
    id: "demo-001",
    name: "Invitado",
    username: "demo",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "demo@gmail.com"
  };


  return (

    <div className="min-h-screen p-6">
      <h1 className="font-poppins font-medium text-[35px] text-[#050534] px-6 pb-2">
        Hotel Los Álamos
      </h1>

      {/* Botones */}
      <div className="mb-4">
        <DashboardActions />
      </div>

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[3fr_2fr] grid-rows-2 gap-6 p-6">
        {/* Bloque 1 (60%) */}
        <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5] shadow-sm">
          <ActividadDiaria />
        </div>

        {/* Bloque 2 (40%) */}
        <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5]">
          <Mantenimiento />
        </div>

        {/* Bloque 3 (60%) */}
        <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5] shadow-sm">
          <UltimaActividad />
        </div>

        {/* Bloque 4 (40%) */}
        <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5]">
          <h2 className="text-lg font-semibold mb-2">Ocupación</h2>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
