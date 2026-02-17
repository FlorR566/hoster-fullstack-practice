import React, { useState, useEffect } from "react";
import { User } from "../types";
import { Button } from "../components/common/Button";
import { getAIGreeting } from "../services/service";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import ActividadDiaria from "../components/dashboard/ActividadDiaria";

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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6 p-6">

      {/* Bloque 1 */}
      <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5] shadow-sm">
        <ActividadDiaria />
      </div>

      {/* Bloque 2 */}
      <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5]">
        <h2 className="text-lg font-semibold mb-2">Mantenimiento</h2>
      </div>

      {/* Bloque 3 */}
      <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5]">
        <h2 className="text-lg font-semibold mb-2">Ultima actividad</h2>
      </div>

      {/* Bloque 4 */}
      <div className="border border-slate-200 rounded-xl p-4 bg-[#F5F5F5]">
        <h2 className="text-lg font-semibold mb-2"> Ocupacion</h2>
      </div>

    </div>
  );
};

export default Dashboard;
