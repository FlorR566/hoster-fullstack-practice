import React, { useState } from "react";
import RoomCard from "../components/roomsOverview/RoomCard";

// Dentro de RoomsOverview.tsx
const roomsData: RoomProps[] = [
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
];

const RoomsOverview: React.FC = () => {
	const [activeTab, setActiveTab] = useState("habitaciones");

	return (
		<div className="bg-[#F8F9FA] min-h-screen font-['Poppins']">
			{/* HEADER: Título + Switch */}
			<div className="flex flex-col items-center mx-auto max-w-[1400px] mb-10 space-y-6">
				<h1 className="font-['Poppins'] font-medium text-[#050534] text-[35px] self-start pt-6 pl-6">
					Unidades de Alojamiento
				</h1>
				{/* BOTON SWITCH */}
				<div className="flex bg-[#E5E7EB] rounded-full  w-fit  overflow-hidden font-['Poppins'] text-[30px] ">
					<button
						onClick={() => setActiveTab("habitaciones")}
						className={`px-8 py-0.5 rounded-bl font-extralight transition-all uppercase ${
							activeTab === "habitaciones"
								? "bg-[#050534] text-white "
								: "text-[#050534]"
						}`}
					>
						Habitaciones
					</button>
					<button
						onClick={() => setActiveTab("cabañas")}
						className={`px-8 py-0.5 rounded-br  font-extralight transition-all uppercase ${
							activeTab === "cabañas"
								? "bg-[#050534] text-white "
								: "text-[#050534]"
						}`}
					>
						Cabañas
					</button>
				</div>
			</div>

			<div className="mx-auto max-w-[1400px] min-h-[900px] grid grid-cols-[repeat(auto-fill,250px)] gap-6  justify-center">
				{roomsData.map((room) => (
					<RoomCard key={room.id} {...room} />
				))}
			</div>
		</div>
	);
};

export default RoomsOverview;
