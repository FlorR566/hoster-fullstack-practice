import { X, Wrench } from "lucide-react";

interface Props {
	reportId: string;
	onClose: () => void;
}

export const DetailModal = ({ reportId, onClose }: Props) => {
	// Aquí podrías buscar el reporte completo usando el ID desde tu estado global o hook
	// const report = reports.find(r => r.id === reportId);

	return (
		<div className="font-['Poppins'] fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
			<div className="bg-[var(--light-card)] rounded-3xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
				{/* Header del Modal */}
				<div className=" p-6 text-[var(--light-text)] flex justify-between items-center">
					<div className="flex flex gap-3 justify-between items-center">
						<Wrench size={24} />
						<h3 className="text-[20px]">Reporte</h3>
					</div>

					<button
						onClick={onClose}
						className="hover:bg-white/20 p-1 rounded-full transition-colors"
					>
						<X size={24} />
					</button>
				</div>

				{/* Contenido */}
				<div className="p-8 space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
								Reporte ID
							</p>
							<p className="text-lg font-medium text-gray-800">{reportId}</p>
						</div>
						<div>
							<p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
								Numero de alojamiento
							</p>
							<p className="text-lg font-medium text-gray-800">H04-D</p>
						</div>
					</div>

					<hr className="border-gray-100" />

					<div>
						<p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">
							Descripción del incidente
						</p>
						<div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 leading-relaxed">
							"Se atendió reporte de falla en el sistema de aire acondicionado
							(Split). Al llegar, se detectó una obstrucción en la manguera de
							desagüe y filtros saturados de polvo. Se procedió a la limpieza
							profunda de filtros y purga del sistema de drenaje. El equipo
							vuelve a enfriar a la temperatura de consigna (24°C), pero se
							recomienda cambio de termostato en la próxima revisión
							preventiva."
						</div>
					</div>

					<div className="flex justify-end">
						<button
							onClick={onClose}
							className="bg-[var(--light-accent)] hover:opacity-90 text-white px-4 py-3 rounded-full transition-colors"
						>
							Dejar de ver
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
