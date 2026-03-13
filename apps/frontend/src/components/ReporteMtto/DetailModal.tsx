import BaseModalVerMas, {
	ModalRow,
	ModalField,
	ModalTextarea,
} from "../common/modals/BaseModalVerMas";
import { MaintenanceReport } from "../../types/maintenance";
import { Wrench } from "lucide-react";

interface DetailModalProps {
	report: MaintenanceReport; // El reporte que viene de la BD
	onClose: () => void;
}

export const DetailModal = ({ report, onClose }: DetailModalProps) => {
	return (
		<BaseModalVerMas
			isOpen={true} // Si el componente se monta, es porque está abierto
			onClose={onClose}
			title="Reporte"
			icon={<Wrench size={20} />}
		>
			{/* Distribuye los datos de la BD en los campos del modal */}
			<ModalRow>
				<ModalField label="Reporte ID" value={report.id} />
				<ModalField label="Número de alojamiento" value={report.roomId} />
			</ModalRow>

			<ModalRow>
				<ModalField
					label="Fecha donde ocurrió el mantenimiento"
					value={report.reportDate}
				/>
				<ModalField label="Hora del mantenimiento" value={report.time} />
			</ModalRow>

			<ModalRow>
				<ModalField label="Duración estimada" value={report.duration} />
				<ModalField label="Nombre del responsable" value={report.owner} />
			</ModalRow>

			<ModalTextarea
				label="Descripción de la tarea"
				value={report.description}
			/>
		</BaseModalVerMas>
	);
};