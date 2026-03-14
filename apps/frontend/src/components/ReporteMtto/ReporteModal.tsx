import { useState, useEffect } from "react";
import BaseModalFormulario, {
  FormRadioGroup,
  FormField,
  FormSelect,
  FormTextarea,
} from "../common/modals/BaseModalFormulario";
import { NewMaintenanceReport, ReportCategory } from "../../types/maintenance";
import { createMaintenanceReport, getAllUnits } from "../../api/maintenanceApi";
import { Wrench } from "lucide-react";

interface ReportModalProps {
  onClose: () => void;
}

export const ReportModal = ({ onClose }: ReportModalProps) => {
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

  const [units, setUnits] = useState<any[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  useEffect(() => {
  const fetchUnits = async () => {
    try {
      console.log("Intentando cargar unidades desde:", import.meta.env.VITE_API_URL + "/api/unit/get-units");
      const data = await getAllUnits();
      console.log("Unidades recibidas del backend:", data);
      setUnits(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Error al cargar unidades:", err);
      alert("No se pudieron cargar las unidades: " + (err.message || "Revisa la consola"));
      setUnits([]);
    } finally {
      setLoadingUnits(false);
    }
  };

  fetchUnits();
}, []);

  const handleConfirm = async () => {
    if (!formData.roomId || !formData.description || !formData.category) {
      alert("Por favor completá todos los campos obligatorios.");
      return;
    }

    try {
      await createMaintenanceReport(formData);
      alert("Reporte creado correctamente ✅");
      onClose();
    } catch (error: any) {
      alert(error.message || "Error al crear el reporte");
    }
  };

  return (
    <BaseModalFormulario
      isOpen={true}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Nuevo Reporte"
      icon={<Wrench size={18} />}
      confirmText="Confirmar"
      confirmDisabled={!formData.roomId || !formData.description}
    >
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
        placeholder="Se genera automáticamente"
        value={formData.id}
        onChange={(val) => setFormData({ ...formData, id: val })}
      />

      <FormSelect
		label="Número de alojamiento"
		placeholder={
			loadingUnits
			? "Cargando alojamientos..."
			: units.length === 0
			? "No hay alojamientos registrados"
			: "Selecciona un alojamiento"
		}
		options={units.map((u) => ({
			value: String(u.id),
			label: u.type || `Unidad ${u.id} (sin tipo)`,
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