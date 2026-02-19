import React from "react";
import { User } from "lucide-react";

const STATUS_STYLES = {
	ocupada: "bg-red-300 text-gray-950 border-red-700",
	limpieza: "bg-orange-200 text-gray-950 border-orange-400",
	disponible: "bg-green-200 text-gray-950 border-green-700",
};

const TYPE_BORDER = {
	estandar: "border-l-[#A5A6F6]",
	deluxe: "border-l-[#3D3BF3]",
	presidencial: "border-l-[#050534]",
};

interface RoomCardProps {
	id: string;
	type: keyof typeof TYPE_BORDER;
	status: keyof typeof STATUS_STYLES;
	capacity: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ id, type, status, capacity }) => {
	return (
		<div className="group">
			{" "}
			{/* Contenedor padre opcional para efectos */}
			<div
				className={`relative bg-[#F5F5F5] rounded-2xl p-4 h-48 w-full  min-h-[250px] flex flex-col justify-between border-l-[6px] ${TYPE_BORDER[type]}`}
			>
				{/* SVG de Borde Punteado */}
				<svg
					className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
					preserveAspectRatio="none"
				>
					<rect
						x="-6"
						y="1"
						width="calc(100% + 5px)"
						height="calc(100% - 2px)"
						rx="16"
						fill="none"
						stroke="#374151"
						strokeWidth="2"
						strokeDasharray="10, 10"
						className="shape-rendering-crispEdges"
					/>
				</svg>

				<div className="relative z-10 h-full flex flex-col justify-between">
					{/* Header: Iconos y Badge */}
					<div className="flex flex-col justify-between items-start gap-2">
						<div className="flex gap-0.5">
							{Array.from({ length: capacity }).map((_, i) => (
								<User key={i} size={23} className="text-gray-900" />
							))}
						</div>

						<span
							className={`font-['Poppins'] text-[14px] px-2 py-0.5 rounded-full uppercase border ${STATUS_STYLES[status]}`}
						>
							{status === "limpieza" ? "En limpieza" : status}
						</span>
					</div>

					{/* Body: ID de Habitación */}
					<div className="flex justify-center items-center flex-grow">
						<h3 className="font-['Poppins'] font-bold text-[#050534] text-[40px]">
							{id}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomCard;
