import { useState } from "react";
import BaseModalFormulario, {
	FormRadioGroup,
	FormField,
	FormSelect,
	FormTextarea,
} from "../common/modals/BaseModalFormulario";
import { NewMaintenanceReport, ReportCategory } from "../../types/maintenance";
import { roomsData } from "../../data/roomsData";
import { Wrench } from "lucide-react";

interface ReportModalProps {
	onClose: () => void;
}

export const ReportModal = ({ onClose }: ReportModalProps) => {
	// Estado para capturar los datos del nuevo reporte
	const [formData, setFormData] = useState<NewMaintenanceReport>({
		category: "Mantenimiento",
		id: "",
		duration: "",
		roomId: "",
		owner: "",
		reportDate: "",
		startTime: "",
		description: "",
	});

	const handleConfirm = () => {
		const idPattern = /^[ML]-\d{10}$/;
		if (!idPattern.test(formData.id)) {
			alert("El Reporte ID debe tener el formato M-0000000145");
			return;
		}
		if (!formData.roomId || !formData.description || !formData.category) {
			alert("Por favor completá todos los campos obligatorios.");
			return; // no enviar si faltan estos campos obligatorios
		}
		console.log("Enviando nuevo reporte a la BD:", formData);
		// Aquí iría la lógica para actualizar tu estado global o llamar a la API
		onClose();
	};

	return (
		<BaseModalFormulario
			isOpen={true}
			onClose={onClose}
			onConfirm={handleConfirm}
			title="Nuevo Reporte"
			icon={<Wrench size={18} />}
			confirmText="Confirmar"
			confirmDisabled={!formData.roomId || !formData.description} // Validación simple
		>
			{/* Campos del Formulario */}
			<FormRadioGroup
				label="Tipo de Reporte"
				name="Tipo de Reporte"
				value={formData.category}
				onChange={(val) =>
					setFormData({ ...formData, category: val as ReportCategory })
				}
				options={[
					{ value: "Mantenimiento", label: "Mantenimiento" },
					{ value: "Limpieza", label: "Limpieza" },
				]}
			/>

			<FormField
				label="Reporte ID"
				placeholder="Ej: M-0000000145"
				value={formData.id}
				onChange={(val) => setFormData({ ...formData, id: val })}
			/>

			<FormSelect
				label="Número de alojamiento"
				placeholder="Selecciona"
				options={roomsData.map((room) => ({
					value: room.id,
					label: room.id,
				}))}
				value={formData.roomId}
				onChange={(val) => setFormData({ ...formData, roomId: val })}
			/>

			<FormField
				label="Duración estimada"
				type="number"
				placeholder="1 h"
				value={formData.duration}
				onChange={(val) => setFormData({ ...formData, duration: val })}
			/>

			<FormField
				label="Nombre del responsable"
				placeholder="Ej: Juan Perez"
				value={formData.owner}
				onChange={(val) => setFormData({ ...formData, owner: val })}
			/>

			<FormField
				label="Fecha"
				type="date"
				placeholder="DD/MM/AAAA"
				value={formData.reportDate}
				onChange={(val) => setFormData({ ...formData, reportDate: val })}
			/>

			<FormField
				label="Horario de comienzo"
				type="time"
				placeholder="00:00"
				value={formData.startTime}
				onChange={(val) => setFormData({ ...formData, startTime: val })}
			/>

			<FormTextarea
				label="Descripción"
				placeholder="Descripción ..."
				value={formData.description}
				onChange={(val) => setFormData({ ...formData, description: val })}
			/>
		</BaseModalFormulario>
	);
};
