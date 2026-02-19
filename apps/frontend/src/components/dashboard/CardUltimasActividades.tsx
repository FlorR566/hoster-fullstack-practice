import React from "react";
import { ClipboardList, UserX, ClipboardPlus, UserCheck, UserMinus, User, Users, Banknote, Clock, MoreVertical, BedDouble, HandPlatter, CalendarArrowDown, CalendarArrowUp, Car, Store } from "lucide-react";

const CardUltimasActividades: React.FC<{ item: any }> = ({ item }) => {

    const tipo = String(item?.tipo ?? "");

    const isCheckIn = tipo === "Check-in";
    const isCheckOut = tipo === "Check-out";
    const isNuevaReserva = tipo === "Nueva reserva";
    const isCancelacion = tipo === "Cancelación";
    const isServicioAsignado = tipo === "Servicio asignado";
    const parkingLabel = item.parking ? "Sí" : "No";

    const lugarLabel = item?.habitacion ? "Habitación" : item?.cabana ? "Cabaña" : "Lugar";
    const lugarValue = item?.habitacion ?? item?.cabana ?? "—";

    const llegada = item?.fechas?.llegada ?? item?.fecha ?? "—";
    const salida = item?.fechas?.salida ?? "—";


    // Servicios: si es number -> mostrar número; si es objeto -> listar keys true
    const serviciosText = (() => {
        const sa = item?.serviciosAdicionales;

        if (typeof sa === "number") return String(sa);

        if (sa && typeof sa === "object") {
            const keys = Object.keys(sa).filter((k) => Boolean(sa[k]));
            return keys.length ? keys.join(", ") : "—";
        }

        return "—";
    })();
    const serviciosIsNumber = typeof item?.serviciosAdicionales === "number";

    const Icon = () => {
        if (isNuevaReserva) return <ClipboardPlus size={18} className="text-blue-600" />;
        if (isServicioAsignado) return <HandPlatter size={18} className="text-[#050534]" />;
        if (isCancelacion) return <UserX size={18} className="text-red-600" />;
        if (isCheckIn) return <UserCheck size={18} className="text-green-600" />;
        if (isCheckOut) return <UserMinus size={18} className="text-red-600" />;
        return <ClipboardList size={18} className="text-[#050534]" />;
    };

    return (
        <div className="border-b border-[#D4D4D4] py-3">
            <div className="grid grid-cols-[38px_1.2fr_1.4fr_1.4fr_32px] gap-3 font-poppins">
                <div className="flex justify-start items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                        <Icon />
                    </div>
                </div>

                {/* Col 2 */}
                <div className="text-start">
                    <p className="text-[16px] text-gray-500 font-bold">Reserva # {item.reservaId}</p>

                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#D4D4D4] rounded-lg text-[10px] font-light text-[#050534]">
                            {tipo}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <User size={14} className="text-[#050534]" />
                        <p className="text-[14px] text-[#050534] font-light">{item?.cliente ?? "—"}</p>
                    </div>

                    {/* En servicio asignado capaz personas viene, lo dejamos con fallback */}
                    <div className="flex items-center gap-2 mt-1">
                        <Users size={14} className="text-[#050534]" />
                        <p className="text-[14px] text-[#050534] font-light">
                            {item?.personas ?? "—"}{" "}
                            {item?.personas === 1 ? "persona" : "personas"}
                        </p>
                    </div>

                    {/* Pago NO existe en servicio asignado: lo ocultamos */}
                    {!isServicioAsignado && (
                        <div className="flex items-center gap-2 mt-1">
                            <Banknote size={14} className="text-[#050534]" />
                            <p className="text-[14px] text-[#050534] font-light">
                                Pago: {item?.pago ?? "—"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Col 3 */}
                <div className="text-start">
                    <div className="h-[50px]" />
                    <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">Hora: {item?.hora ?? "—"}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        {item?.habitacion ? (
                            <BedDouble size={14} className="text-[#050534]" />
                        ) : (
                            <Store size={14} className="text-[#050534]" />
                        )}
                        <p className="text-[14px] font-light text-[#050534]">
                            {lugarLabel}: {lugarValue}
                        </p>
                    </div>

                    {serviciosIsNumber && (
                        <div className="flex items-center gap-2 mt-1">
                            <HandPlatter size={14} className="text-[#050534]" />
                            <p className="text-[14px] font-light text-[#050534]">
                                Servicios adicionales: {serviciosText}
                            </p>
                        </div>
                    )}
                </div>

                {/* Col 4 */}
                <div className="text-center">
                    <div className="h-[50px]" />

                    <div className="flex items-center gap-2 mt-1">
                        <CalendarArrowDown size={14} className="text-[#050534]" />
                        <p className="text-[14px] font-light text-[#050534]">
                            {isServicioAsignado ? "Fecha:" : "Fecha llegada:"} {llegada}
                        </p>
                    </div>

                    {isServicioAsignado && !serviciosIsNumber && serviciosText !== "—" && (
                        <div className="flex items-center gap-2 mt-1">
                            <HandPlatter size={14} className="text-[#050534]" />
                            <p className="text-[14px] font-light text-[#050534] text-start">
                                Servicio adicional: {serviciosText}
                            </p>
                        </div>
                    )}


                    {/* En servicio asignado no hay salida: lo ocultamos */}
                    {!isServicioAsignado && (
                        <div className="flex items-center gap-2 mt-1">
                            <CalendarArrowUp size={14} className="text-[#050534]" />
                            <p className="text-[14px] font-light text-[#050534]">
                                Fecha salida: {salida}
                            </p>
                        </div>
                    )}

                    {!isServicioAsignado && (
                        <div className="flex items-center gap-2 mt-1">
                            <Car size={14} className="text-[#050534]" />
                            <p className="text-[14px] font-light text-[#050534]">
                                Parking: {parkingLabel}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center items-start pt-1">
                    <MoreVertical size={18} className="text-[#050534] cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default CardUltimasActividades;
