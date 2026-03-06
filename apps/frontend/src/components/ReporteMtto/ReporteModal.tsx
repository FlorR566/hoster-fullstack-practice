import { useState } from "react";
import BaseModalFormulario, {
	FormRadioGroup,
	FormField,
	FormSelect,
	FormTextarea,
} from "../common/modals/BaseModalFormulario";
import { Wrench } from "lucide-react";

interface ReportModalProps {
	onClose: () => void;
}

export const ReportModal = ({ onClose }: ReportModalProps) => {
	// Estado para capturar los datos del nuevo reporte
	const [formData, setFormData] = useState({
		type: "",
		id: "",
		roomId: "",
		owner: "",
		category: "",
		description: "",
	});

	const [tipoReporte, setTipoReporte] = useState("Mantenimiento"); // Estado para el radio

	const handleConfirm = () => {
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
				value={tipoReporte}
				onChange={(val) => setTipoReporte(val)} // revisar si este dato se guarda bien
				options={[
					{ value: "Limpieza", label: "Limpieza" },
					{ value: "Mantenimiento", label: "Mantenimiento" },
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
				// NOTA: VER LA FORMA DE ACOMODAR MEJOR ESTA PARTE (HABITACIONES Y CABAÑAS)
				options={[
					{ value: "H01", label: "H01" },
					{ value: "H02", label: "H02" },
					{ value: "H03", label: "H03" },
					{ value: "H04", label: "H04" },
					{ value: "H05", label: "H05" },
					{ value: "H06", label: "H06" },
					{ value: "H07", label: "H07" },
					{ value: "H08", label: "H08" },
					{ value: "H09", label: "H09" },
				]}
				value={formData.roomId}
				onChange={(val) => setFormData({ ...formData, roomId: val })}
			/>

			<FormField
				label="Nombre del responsable"
				placeholder="Ej: Juan Perez"
				value={formData.owner}
				onChange={(val) => setFormData({ ...formData, owner: val })}
			/>

			<FormField
				label="Fecha"
				placeholder="DD/MM/AAAA"
				value={formData.roomId}
				onChange={(val) => setFormData({ ...formData, roomId: val })}
			/>

			<FormField
				label="Horario de comienzo"
				placeholder="00:00"
				value={formData.roomId}
				onChange={(val) => setFormData({ ...formData, roomId: val })}
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
