import React, { useState } from "react";
import RoomCard from "../components/roomsOverview/RoomCard";

// Dentro de RoomsOverview.tsx
const roomsData: RoomProps[] = [
	// Habitaciones
	{ id: "H1", type: "Presidencial", status: "Ocupada", capacity: 4 },
	{ id: "H2", type: "Deluxe", status: "Ocupada", capacity: 2 },
	{ id: "H3", type: "Deluxe", status: "Limpieza", capacity: 4 },
	{ id: "H4", type: "Deluxe", status: "Disponible", capacity: 4 },
	{ id: "H5", type: "Deluxe", status: "Disponible", capacity: 4 },
	{ id: "H6", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H7", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H8", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H9", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H10", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H11", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H12", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H13", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H14", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H15", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H16", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H17", type: "Estandar", status: "Disponible", capacity: 4 },
	{ id: "H18", type: "Estandar", status: "Disponible", capacity: 4 },
	// Cabañas
	{ id: "C1", type: "Estandar", status: "Ocupada", capacity: 2 },
	{ id: "C2", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "C3", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "C4", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "C5", type: "Estandar", status: "Disponible", capacity: 2 },
	{ id: "C6", type: "Estandar", status: "Disponible", capacity: 2 },
];

const ROOM_TYPES_LEGEND = [
	{ label: "Estándar", color: "bg-[var(--light-chart1)]" },
	{ label: "Deluxe", color: "bg-[var(--light-chart2)]" },
	{ label: "Presidencial", color: "bg-[var(--light-chart3)]" },
];

const STATUS_LEGEND = [
	{ label: "Ocupado", color: "bg-[var(--light-status-ocupied)]" },
	{ label: "En limpieza", color: "bg-[var(--light-status-pending)]" },
	{ label: "Disponible", color: "bg-[var(--light-status-completed)]" },
];

const LegendItem = ({ color, label }: { color: string; label: string }) => (
	<div className="flex items-center gap-2 w-[180px] text-[var(--light-text)]">
		<span className={`w-8 h-8 rounded ${color}`}></span>
		<span>{label}</span>
	</div>
);

const RoomsOverview: React.FC = () => {
	const tabs = ["Habitaciones", "Cabañas", "Servicios Adicionales"] as const;
	const [activeTab, setActiveTab] =
		useState<(typeof tabs)[number]>("Habitaciones");

	const filteredRooms = roomsData.filter((room) => {
		if (activeTab === "Habitaciones") return room.id.startsWith("H");
		return room.id.startsWith("C");
	});

	return (
		<div className="min-h-screen p-6 font-['Poppins']">
			<h1 className="font-medium text-[var(--light-text)] text-[35px] px-6">
				Unidades de Alojamiento
			</h1>

			{/* BUTTONS */}
			<div className="flex gap-3 bg-[var(--light-main2)] max-w-[515px] rounded-lg p-1 m-6">
				{tabs.map((label) => {
					const isActive = activeTab === label;

					return (
						<button
							key={label}
							onClick={() => setActiveTab(label)}
							className={`px-2 whitespace-nowrap text-[20px] h-[42px] font-normal rounded-md transition ${isActive ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] shadow-sm" : "text-[var(--light-text)] hover:bg-white/10"}`}
						>
							{label}
						</button>
					);
				})}
			</div>

			{/* LEYENDA */}
			<div className="flex gap-x-6 pt-0 p-6 items-centerself-start text-[20px] text-[var(--light-text)]">
				{activeTab === "Habitaciones" && (
					<div className="flex-col border-r-[2px] border-r-[var(--light-outline)]">
						<h2 className="font-semibold text-[20px]">Tipo de habitación</h2>
						<div className="flex flex-wrap  gap-x-5 pt-5">
							{ROOM_TYPES_LEGEND.map((item) => (
								<LegendItem key={item.label} {...item} />
							))}
						</div>
					</div>
				)}

				<div className="flex-col">
					<h2 className="font-semibold text-[20px]">Estado</h2>
					<div className="flex flex-wrap  gap-x-5 pt-5">
						{STATUS_LEGEND.map((item) => (
							<LegendItem key={item.label} {...item} />
						))}
					</div>
				</div>
			</div>

			<div
				className={`grid grid-cols-[repeat(auto-fill,250px)] gap-6 justify-center pt-4 pb-[20dvh] text-[var(--light-text)] ${activeTab === "Habitaciones" ? "max-w-[1400px]" : "max-w-[850px]"}`}
			>
				{filteredRooms.map((room) => (
					<RoomCard key={room.id} {...room} />
				))}
			</div>
		</div>
	);
};

export default RoomsOverview;
