export const ReportModal = ({ onClose }: { onClose: () => void }) => {
	// manejar acá el onSubmit para enviar al backend
	return (
		<div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl mx-auto mt w-[min(920px,92vw)] rounded-2xl bg-[var(--light-card)] shadow-xl overflow-hidden">
				<h2 className="text-xl font-bold mb-4">
					Nuevo Reporte de Mantenimiento
				</h2>
				{/*  Formulario Aquí */}
				<div className="flex justify-end gap-3 mt-6">
					<button onClick={onClose} className="px-4 py-2 text-gray-500">
						Cancelar
					</button>
					<button className="bg-[#5D5FEF] text-white px-6 py-2 rounded-xl">
						Guardar
					</button>
				</div>
			</div>
		</div>
	);
};
