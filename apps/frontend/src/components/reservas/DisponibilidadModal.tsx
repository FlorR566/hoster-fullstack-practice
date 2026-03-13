import React from "react";
import { X, User } from "lucide-react";
import { roomsData } from "../../data/roomsData";
import type { RoomProps } from "../../types/room";
import { TYPE_BORDER, STATUS_STYLES } from "../../types/room";

interface Props {
	onClose: () => void;
	onSelect: (room: RoomProps) => void;
}

export const DisponibilidadModal = ({ onClose, onSelect }: Props) => {
	const available = roomsData.filter((r) => r.status === "Disponible");
	const [selected, setSelected] = React.useState<RoomProps | null>(null);

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
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
					<h2 className="text-[35px] font-medium text-[var(--light-text)]">
						Disponibilidad de alojamiento
					</h2>
					<button
						onClick={onClose}
						className="text-[var(--light-text)] opacity-60 hover:opacity-100 transition"
					>
						<X size={25} />
					</button>
				</div>

				{/* Grid */}
				<div className="overflow-y-auto px-6 pb-4 pt-1" style={{ flex: 1 }}>
					{available.length === 0 ? (
						<p className="text-center text-[14px] text-[var(--light-text)] opacity-60 py-10">
							No hay alojamientos disponibles.
						</p>
					) : (
						<div className="grid grid-cols-3 gap-4">
							{available.map((room) => {
								const isSelected = selected?.id === room.id;
								return (
									<div
										key={room.id}
										onClick={() => setSelected(room)}
										className={`
                      group relative cursor-pointer
                      text-[var(--light-text)]
                      rounded-2xl p-4 h-[250px] w-full flex flex-col justify-between
                      border-l-[6px] ${TYPE_BORDER[room.type]}
                      transition-all duration-150
                      ${isSelected
												? "bg-[var(--light-main2)] outline outline-2 outline-[var(--light-accent)]"
												: "bg-[var(--light-card)] hover:bg-[var(--light-main2)] hover:outline hover:outline-2 hover:outline-[var(--light-accent)]"
											}
                    `}
									>
										{/* Mismo SVG de RoomCard */}
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
												className="text-[var(--light-text)]"
											/>
										</svg>

										<div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
											{/* Capacidad + Badge */}
											<div className="flex flex-col gap-2">
												<div className="flex gap-0.5">
													{Array.from({ length: room.capacity }).map((_, i) => (
														<User
															key={i}
															size={16}
															className="text-[var(--light-text)]"
														/>
													))}
												</div>
												<span
													className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase border w-fit ${STATUS_STYLES[room.status]}`}
												>
													{room.status}
												</span>
											</div>

											{/* ID */}
											<div className="absolute inset-0 flex justify-center items-center">
												<h3 className="font-bold text-[32px]">
													{room.code}-{room.type.charAt(0).toUpperCase()}
												</h3>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>

				{/* Butons */}
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
						disabled={!selected}
						onClick={() => {
							if (selected) {
								// Enviamos solo el id numérico para backend, pero seguimos mostrando el code
								onSelect({
									...selected,
									id: selected.id // ⚡ aquí id numérico
								});
								onClose();
							}
						}}
					>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};
