import React from "react";
import { User } from "lucide-react";

const STATUS_STYLES = {
	ocupada:
		"border-[var(--light-status-ocupied)] bg-[color-mix(in_srgb,var(--light-status-ocupied),transparent_80%)]",
	limpieza:
		"border-[var(--light-status-pending)] bg-[color-mix(in_srgb,var(--light-status-pending),transparent_80%)] ",
	disponible:
		"border-[var(--light-status-completed)] bg-[color-mix(in_srgb,var(--light-status-completed),transparent_80%)] ",
};

const TYPE_BORDER = {
	estandar: "border-l-[var(--light-chart1)]",
	deluxe: "border-l-[var(--light-chart2)]",
	presidencial: "border-l-[var(--light-chart3)]",
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
				className={`relative bg-[var(--light-card)] text-[var(--light-text)] rounded-2xl p-4 h-48 w-full  min-h-[250px] flex flex-col justify-between border-l-[6px] ${TYPE_BORDER[type]}`}
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
						stroke="currentColor"
						strokeWidth="1.5"
						strokeDasharray="10, 10"
						className="shape-rendering-crispEdges text-[var(--light-text)]"
					/>
				</svg>

				<div className="relative z-10 h-full flex flex-col justify-between">
					{/* Header: Iconos y Badge */}
					<div className="flex flex-col justify-between items-start gap-2">
						<div className="flex gap-0.5">
							{Array.from({ length: capacity }).map((_, i) => (
								<User key={i} size={23} className="text-[var(--light-text)]" />
							))}
						</div>

						<span
							className={`font-['Poppins'] text-[14px] px-2 py-0.5 rounded-full uppercase border ${STATUS_STYLES[status]}`}
						>
							{status === "limpieza" ? "En limpieza" : status}
						</span>
					</div>

					{/* Body: ID de Habitación */}
					<div className="absolute inset-0 flex justify-center items-center pointer-events-none ">
						<h3 className="font-['Poppins'] font-bold text-[40px] pointer-events-auto">
							{id}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomCard;
