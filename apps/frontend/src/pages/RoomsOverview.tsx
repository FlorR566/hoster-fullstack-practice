import React, { useState } from "react";
import RoomCard from "../components/roomsOverview/RoomCard";

// Dentro de RoomsOverview.tsx
const roomsData: RoomProps[] = [
	// Habitaciones
	{ id: "H1", type: "presidencial", status: "ocupada", capacity: 4 },
	{ id: "H2", type: "deluxe", status: "ocupada", capacity: 2 },
	{ id: "H3", type: "deluxe", status: "limpieza", capacity: 4 },
	{ id: "H4", type: "deluxe", status: "disponible", capacity: 4 },
	{ id: "H5", type: "deluxe", status: "disponible", capacity: 4 },
	{ id: "H6", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H7", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H8", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H9", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H10", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H11", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H12", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H13", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H14", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H15", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H16", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H17", type: "estandar", status: "disponible", capacity: 4 },
	{ id: "H18", type: "estandar", status: "disponible", capacity: 4 },
	// Cabañas
	{ id: "C1", type: "estandar", status: "ocupada", capacity: 2 },
	{ id: "C2", type: "estandar", status: "disponible", capacity: 2 },
	{ id: "C3", type: "estandar", status: "disponible", capacity: 2 },
	{ id: "C4", type: "estandar", status: "disponible", capacity: 2 },
	{ id: "C5", type: "estandar", status: "disponible", capacity: 2 },
	{ id: "C6", type: "estandar", status: "disponible", capacity: 2 },
];

const ROOM_TYPES_LEGEND = [
	{ label: "Estándar", color: "bg-[#A5A6F6]" },
	{ label: "Deluxe", color: "bg-[#3D3BF3]" },
	{ label: "Presidencial", color: "bg-[#050534]" },
];

const STATUS_LEGEND = [
	{ label: "Ocupado", color: "bg-[#FF4D4D]" },
	{ label: "En limpieza", color: "bg-[#FFB347]" },
	{ label: "Disponible", color: "bg-[#4CAF50]" },
];

const LegendItem = ({ color, label }: { color: string; label: string }) => (
	<div className="flex items-center gap-2 w-[180px]  ">
		<span className={`w-8 h-8 rounded ${color}`}></span>
		<span className="text-[23px] text-[#050534]">{label}</span>
	</div>
);

const RoomsOverview: React.FC = () => {
	const [activeTab, setActiveTab] = useState("habitaciones");

	const filteredRooms = roomsData.filter((room) => {
		if (activeTab === "habitaciones") return room.id.startsWith("H");
		return room.id.startsWith("C");
	});

	return (
		<div className="bg-[#F8F9FA] min-h-screen font-['Poppins']">
			{/* HEADER: */}
			<div className="flex flex-col items-center mx-auto max-w-[1400px] mb-10 space-y-6">
				<h1 className="font-['Poppins'] font-medium text-[#050534] text-[35px] self-start pt-6 pl-6">
					Unidades de Alojamiento
				</h1>

				{/* BUTTON SWITCH */}
				<div className="flex bg-[#E5E7EB] rounded-full w-fit max-w-[480px] shadow-md overflow-hidden font-['Poppins'] text-[30px] ">
					<button
						onClick={() => setActiveTab("habitaciones")}
						className={`px-8 py-0.5 rounded-bl font-extralight transition-colors  uppercase ${
							activeTab === "habitaciones"
								? "bg-[#050534] text-white "
								: "text-[#050534]"
						}`}
					>
						Habitaciones
					</button>
					<button
						onClick={() => setActiveTab("cabañas")}
						className={`px-8 py-0.5 rounded-br font-extralight transition-colors uppercase ${
							activeTab === "cabañas"
								? "bg-[#050534] text-white "
								: "text-[#050534]"
						}`}
					>
						Cabañas
					</button>
				</div>

				{/* LEYENDA */}
				<div className="flex flex-col gap-y-4 pt-4 items-center ">
					{/* Habitaciones */}
					{activeTab === "habitaciones" && (
						<div className="flex flex-wrap self-start gap-x-10 ">
							{ROOM_TYPES_LEGEND.map((item) => (
								<LegendItem key={item.label} {...item} />
							))}
						</div>
					)}
					{/* Estados */}
					<div className="flex flex-wrap self-start gap-x-10">
						{STATUS_LEGEND.map((item) => (
							<LegendItem key={item.label} {...item} />
						))}
					</div>
				</div>
			</div>

			<div
				className={`mx-auto grid grid-cols-[repeat(auto-fill,250px)] gap-6  justify-center pb-[20dvh] ${activeTab === "habitaciones" ? "max-w-[1400px]" : "max-w-[850px]"}`}
			>
				{filteredRooms.map((room) => (
					<RoomCard key={room.id} {...room} />
				))}
			</div>
		</div>
	);
};

export default RoomsOverview;
