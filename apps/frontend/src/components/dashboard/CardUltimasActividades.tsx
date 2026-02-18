import React from "react";
import { ClipboardPlus, UserCheck, UserMinus, User, Users, Banknote, Clock, MoreVertical, BedDouble, HandPlatter, CalendarArrowDown, CalendarArrowUp, Car } from "lucide-react";

const CardUltimasActividades: React.FC<{ item: any }> = ({ item }) => {

    const isCheckIn = item.tipo === "Check-in";
    const isCheckOut = item.tipo === "Check-out";
    const isNuevaReserva = item.tipo === "Nueva reserva";

    const parkingLabel = item.parking ? "Sí" : "No";

    const Icon = () => {
        if (isNuevaReserva) {
            return <ClipboardPlus size={18} className="text-blue-600" />;
        }

        if (isCheckIn) {
            return <UserCheck size={18} className="text-green-600" />;
        }

        return <UserMinus size={18} className="text-red-600" />;
    };

    return (
        <div className="border-b border-[#D4D4D4] py-3">
            <div className="grid grid-cols-[38px_1.2fr_1.4fr_1.4fr_32px] gap-3 font-poppins">
                <div className="flex justify-start items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                        <Icon />
                    </div>
                </div>

                <div className="text-start">
                    <p className="text-[16px] text-gray-500 font-bold">Reserva # {item.reservaId}</p>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#D4D4D4] rounded-lg text-[10px] font-light text-[#050534]">
                            {item.tipo}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <User size={14} className="text-[#050534]" />
                        <p className="text-[14px] text-[#050534] font-light">
                            {item.cliente}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <Users size={14} className="text-[#050534]" />
                        <p className="text-[14px] text-[#050534] font-light">
                            {item.personas} {item.personas === 1 ? "persona" : "personas"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <Banknote size={14} className="text-[#050534]" />
                        <p className="text-[14px] text-[#050534] font-light">
                            Pago: {item.pago}
                        </p>
                    </div>
                </div>

                <div className="text-start">
                    <div className="h-[50px]" />   {/* Spacer para alinear con "Cliente" */}
                    <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">Hora: {item.hora}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <BedDouble size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">Habitación: {item.habitacion}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <HandPlatter size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">Servicios adicionales: {item.serviciosAdicionales}</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="h-[50px]" />   {/* Spacer para alinear con "Cliente" */}
                    <div className="flex items-center gap-2 mt-1">
                        <CalendarArrowDown size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">Fecha llegada: {item.fechas.llegada}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <CalendarArrowUp size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">Fecha salida: {item.fechas.salida}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <Car size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">Parking: {parkingLabel}</p>
                    </div>

                </div>

                <div className="flex justify-center items-start pt-1">
                    <MoreVertical size={18} className="text-[#050534] cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default CardUltimasActividades;
