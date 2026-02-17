import React from "react";
import { User } from "lucide-react";

// definiciones de las entradas para cada tarjeta
interface RoomCardProps {
	id: string;
	type: "estandar" | "deluxe" | "presidencial";
	status: "disponible" | "ocupado" | "limpieza";
	capacity: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ id, type, status, capacity }) => {
	// colores dinámicos según estado
	const statusStyles = {
		ocupado: "bg-red-200 text-red-700",
		limpieza: "bg-orange-200 text-orange-700",
		disponible: "bg-green-200 text-green-700",
	};

	// color borde lateral según tipo
	const typeBorder = {
		estandar: "border-l-[#A5A6F6]",
		deluxe: "border-l-[#3D3BF3]",
		presidencial: "border-l-[#050534]",
	};

	return (
		<div
			className={`
      relative bg-[#F8F9FA] rounded-2xl p-4 shadow-sm border-2 border-dashed border-gray-300
      border-l-8 ${typeBorder[type]} 
      flex flex-col justify-between h-48 w-full
    `}
		>
			{/* Capacidad y Badge de Estado */}
			<div className="flex justify-between items-start">
				<div className="flex gap-0.5">
					{/* Renderiza iconos según capacidad */}
					{[...Array(capacity)].map((_, i) => (
						<User key={i} size={16} className="text-gray-600" />
					))}
				</div>

				<span
					className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusStyles[status]}`}
				>
					{status === "limpieza" ? "En limpieza" : status}
				</span>
			</div>

			{/* ID de Habitación */}
			<div className="flex justify-center items-center flex-grow">
				<h3 className="text-4xl font-bold text-[#050534]">{id}</h3>
			</div>
		</div>
	);
};

export default RoomCard;
