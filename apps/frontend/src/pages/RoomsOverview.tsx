import React from "react";
import RoomCard from "../components/roomsOverview/roomCard";
import { User } from "../types";
import { useAuth } from "../hooks/useAuth";

// Dentro de RoomsOverview.tsx
const roomsData: RoomProps[] = [
	{ id: "H1", type: "deluxe", status: "ocupado", capacity: 4 },
	{ id: "H2", type: "estandar", status: "ocupado", capacity: 2 },
	{ id: "H3", type: "deluxe", status: "limpieza", capacity: 4 },
	{ id: "H4", type: "presidencial", status: "disponible", capacity: 4 },
	// ... agrega las 15 habitaciones aquí
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
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
			{roomsData.map((room) => (
				<RoomCard key={room.id} {...room} />
			))}
		</div>
	);
};

export default RoomsOverview;
