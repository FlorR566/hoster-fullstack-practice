import React from 'react'
import { MaintenanceItem } from '@/src/types/dashboard';
import { BedDouble, Store, MoreVertical, BrushCleaning, Wrench, UserX, ClockArrowDown } from "lucide-react";

type Props = { item: MaintenanceItem }

const CardMantenimiento: React.FC<Props> = ({ item }) => {
  const isHabitacion = item.lugar.toLowerCase().includes("habitación");
  const isLimpieza = item.tipo === "Limpieza";

  return (
    <div className="border-b border-[#D4D4D4] py-3">
      <div className="grid grid-cols-[48px_2.1fr_2.1fr_28px] gap-3 font-poppins items-start">

        {/* Icono */}
        <div className="flex justify-start items-start pt-1">
          <div className="w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center">
            {isHabitacion ? (
              <BedDouble size={18} className="text-[#050534]" />
            ) : (
              <Store size={18} className="text-[#050534]" />
            )}
          </div>
        </div>

        <div className="text-start">
          <p className="text-[16px] text-gray-500 font-bold">{item.lugar}</p>
          {/* Tipo + icono */}
          <div className="flex items-center gap-2 py-1">
            {isLimpieza ? (
              <BrushCleaning size={14} className="text-[#050534]" />
            ) : (
              <Wrench size={14} className="text-[#050534]" />
            )}
            <span className="text-[14px] font-light text-[#050534]">
              Tipo: {item.tipo}
            </span>
          </div>
          <p className="text-[14px] font-light text-[#050534]">Estatus: {" "}
            <span className="px-3 py-1 bg-[#D4D4D4] rounded-lg text-[10px] font-light text-[#050534]">
              {item.estado}
            </span>
          </p>
        </div>
      
        <div className="text-start">
          <div className="h-[25px]" />   {/* Spacer para alinear con "Tipo" */}
          <div className="flex items-center gap-2 mt-1">
            <ClockArrowDown size={14} className="text-[#050534]" />
            <p className="text-[14px] font-light text-[#050534]">Duración estimada: {item.duracionEstimada}</p>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <UserX size={14} className="text-[#050534]" />
            <p className="text-[14px] font-light text-[#050534]">Responsable: {item.responsable}</p>
          </div>
        </div>

        <div className="flex justify-center items-start pt-1">
          <MoreVertical size={18} className="text-[#050534] cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default CardMantenimiento