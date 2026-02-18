import React from "react";
import RoomCard from "../components/roomsOverview/RoomCard";
import { User } from "../types";
import { useAuth } from "../hooks/useAuth";

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
	const { user, logout } = useAuth();

	const demoUser: User = {
		id: "demo-001",
		name: "Invitado",
		username: "demo",
		avatar: "https://i.pravatar.cc/150?img=12",
		email: "demo@gmail.com",
	};

	return (
		<div className="mx-auto max-w-[1400px] min-h-[900px] grid grid-cols-[repeat(auto-fill,250px)] gap-6 p-6 justify-center">
			{roomsData.map((room) => (
				<RoomCard key={room.id} {...room} />
			))}
		</div>
	);
};

export default RoomsOverview;
