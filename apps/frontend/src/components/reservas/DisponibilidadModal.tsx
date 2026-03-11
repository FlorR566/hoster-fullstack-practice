import React from "react";
import { X } from "lucide-react";
import { roomsData } from "../../data/roomsData";
import type { RoomProps } from "../../types/room";

interface Props {
	onClose: () => void;
	onSelect: (room: RoomProps) => void;
}

const capacityIcons = (capacity: number) =>
	Array.from({ length: capacity }, (_, i) => (
		<svg
			key={i}
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<circle cx="12" cy="7" r="4" />
			<path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
		</svg>
	));

export const DisponibilidadModal = ({ onClose, onSelect }: Props) => {
	const available = roomsData.filter((r) => r.status === "Disponible");
	const [selected, setSelected] = React.useState<RoomProps | null>(null);

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black/40 "
			onClick={onClose}
		>
			<div
				className="relative bg-[var(--light-bg)] rounded-2xl shadow-2xl w-full font-poppins"
				style={{
					maxWidth: "900px",
					maxHeight: "80dvh",
					display: "flex",
					flexDirection: "column",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="font-['Poppins'] flex items-center justify-between px-6 pt-5 pb-4 flex-shrink-0">
					<h2 className="text-[35px] font-semibold text-[var(--light-text)]">
						Disponibilidad de alojamiento
					</h2>
					<button
						onClick={onClose}
						className="text-[var(--light-text)] opacity-60 hover:opacity-100 transition"
					>
						<X size={25} />
					</button>
				</div>

				{/* Grid de habitaciones */}
				<div className="overflow-y-auto px-6 pb-4" style={{ flex: 1 }}>
					{available.length === 0 ? (
						<p className="text-center text-[14px] text-[var(--light-text)] opacity-60 py-10">
							No hay alojamientos disponibles.
						</p>
					) : (
						<div className="grid grid-cols-3 gap-4">
							{available.map((room) => (
								<button
									key={room.id}
									type="button"
									onClick={() => setSelected(room)}
									className={`border-2 border-dashed rounded-xl p-4 text-left transition-all w-[250px] h-[250px] flex flex-col justify-between
        ${
					selected?.id === room.id
						? "border-[var(--light-accent)] bg-[var(--light-main2)]"
						: "border-[var(--light-outline)] hover:border-[var(--light-accent)] hover:bg-[var(--light-main2)]"
				}`}
								>
									{/* Capacidad y badge arriba a la izquierda */}
									<div>
										<div className="flex gap-1 text-[var(--light-text)] opacity-60 mb-2">
											{capacityIcons(room.capacity)}
										</div>
										<span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
											DISPONIBLE
										</span>
									</div>

									{/* Centro: ID */}
									<p className="text-[25px] font-bold text-[var(--light-text)] text-center">
										{room.id}-{room.type.charAt(0).toUpperCase()}
									</p>

									<div />
								</button>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex justify-end gap-3 px-6 py-4 flex-shrink-0">
					<button
						type="button"
						onClick={onClose}
						className="px-6 py-2 rounded-full text-[13px] font-medium bg-[var(--light-input)] text-[var(--light-text)] hover:opacity-80 transition"
					>
						Cancelar
					</button>
					<button
						type="button"
						disabled={!selected} // ← deshabilitado si no hay selección
						onClick={() => {
							if (selected) {
								onSelect(selected);
								onClose();
							}
						}}
						className="px-6 py-2 rounded-full text-[13px] font-medium bg-[var(--light-accent)] text-white hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
					>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};
