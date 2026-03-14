import React, { useState, useEffect, useMemo } from "react";
import type { UltimaActividadItem } from "../../../types/dashboard";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import { filterByTab } from "@/src/utils/filterByTab";
import DashboardCardHeader from "../../common/header/DashboardCardHeader";
import UltimaActividadList from "./UltimaActividadList";
import UltimaActividadModal from "./UltimaActividadModal";
import { reserveApi, Reserve, ReserveWithGuest } from "../../../services/reserve";

const UltimaActividad: React.FC = () => {
    const tabs = ["Vista global", "Nuevas reservas", "Cancelación", "Modificación"] as const;
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Vista global");
    const [openModal, setOpenModal] = useState(false);
    const [reserves, setReserves] = useState<ReserveWithGuest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función para cargar reservas desde la API
    const loadReserves = async () => {
        setLoading(true);
        setError(null);
        try {
            const data: Reserve[] = await reserveApi.getAllReserves();

            // Mapear Reserve a ReserveWithGuest
            const reservesWithGuest: ReserveWithGuest[] = data.map(r => ({
                ...r,
                guest: r['guest'] ?? undefined,   // si tu backend devuelve guest
                createdAt: r['createdAt'] ?? new Date().toISOString(), // fallback
                updatedAt: r['updatedAt'] ?? new Date().toISOString(), // fallback
            }));

            setReserves(reservesWithGuest);
        } catch (err: any) {
            setError(err.message || "Error cargando reservas");
        } finally {
            setLoading(false);
        }
    };

    // Cargar reservas al montar el componente
    useEffect(() => {
        loadReserves();
    }, []);

    // Mapeo para adaptarlo al formato UltimaActividadItem
    const items: UltimaActividadItem[] = reserves.map((r) => ({
        reservaId: r.id,
        tipo: r.updatedAt !== r.createdAt ? "Modificación" : "Nueva reserva", // Si querés podés mapearlo según status real
        cliente: r.guest?.name ?? `Guest #${r.guestId}`,
        personas: r.night, // solo para mostrar algo
        pago: r.stayPrice + r.servicePrice,
        fechas: {
            llegada: r.estimatedCheckIn ?? "—",
            salida: r.estimatedCheckOut ?? "—",
        },
        habitacion: String(r.unitId ?? "—"), // number → string
        serviciosAdicionales: Number(r.servicePrice ?? 0), // string → number
        hora: new Date().toLocaleTimeString(),
        parking: false,
    }));


    const filtered = useMemo(() => {
        switch (activeTab) {
            case "Modificación":
                return items
                    .filter(x => x.tipo === "Modificación")
                    .sort((a, b) => {
                        const aReserve = reserves.find(r => r.id === a.reservaId);
                        const bReserve = reserves.find(r => r.id === b.reservaId);
                        const aDate = aReserve?.updatedAt ?? aReserve?.createdAt ?? "";
                        const bDate = bReserve?.updatedAt ?? bReserve?.createdAt ?? "";
                        return bDate.localeCompare(aDate);
                    })
                    .slice(0, 5);
            case "Nuevas reservas":
                return items
                    .filter(x => x.tipo === "Nueva reserva")
                    .sort((a, b) => {
                        const aReserve = reserves.find(r => r.id === a.reservaId);
                        const bReserve = reserves.find(r => r.id === b.reservaId);
                        const aDate = aReserve?.createdAt ?? "";
                        const bDate = bReserve?.createdAt ?? "";
                        return bDate.localeCompare(aDate);
                    })
                    .slice(0, 5);
            case "Cancelación":
                return items
                    .filter(x => x.tipo === "Cancelación")
                    .slice(0, 5);
            case "Vista global":
            default:
                return [...items]
                    .sort((a, b) => {
                        const aReserve = reserves.find(r => r.id === a.reservaId);
                        const bReserve = reserves.find(r => r.id === b.reservaId);
                        const aDate = aReserve?.updatedAt ?? aReserve?.createdAt ?? "";
                        const bDate = bReserve?.updatedAt ?? bReserve?.createdAt ?? "";
                        return bDate.localeCompare(aDate);
                    })
                    .slice(0, 5);
        }
    }, [activeTab, items, reserves]);


    return (
        <div className="bg-[var(--card)] rounded-xl p-1 h-full">
            <DashboardCardHeader
                title="Gestión de reservas"
                onRefresh={loadReserves} // refresca desde la API
                onViewMore={() => setOpenModal(true)}
            />

            <MiniBarTabs tabs={tabs} value={activeTab} onChange={setActiveTab} className="mb-2" />

            {loading ? (
                <div className="py-4 text-center text-gray-500">Cargando reservas...</div>
            ) : error ? (
                <div className="py-4 text-center text-red-500">{error}</div>
            ) : (
                <UltimaActividadList items={filtered} maxHeightClassName="max-h-[420px]" />
            )}

            <UltimaActividadModal open={openModal} onClose={() => setOpenModal(false)} items={filtered} />
        </div>
    );
};

export default UltimaActividad;