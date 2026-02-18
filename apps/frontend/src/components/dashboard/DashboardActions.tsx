import React from "react";
import { Plus, Pencil, UserX, UserCheck, UserMinus, HandPlatter, CircleAlert, Wrench, BrushCleaning } from "lucide-react";
import NavActionButton from "../common/Navigation/NavActionButton"

const DashboardActions: React.FC = () => {
    return (
        <div className="flex flex-col gap-2 px-6">
            {/* Fila 1 */}
            <div className="flex flex-wrap gap-2">
                <NavActionButton
                    to="/"
                    label="Nueva reserva"
                    icon={<Plus size={16} />}
                />
                <NavActionButton
                    to="/"
                    label="Editar reserva"
                    icon={<Pencil size={16} />}
                />
                <NavActionButton
                    to="/"
                    label="Cancelar reserva"
                    icon={<UserX size={16} />}
                />
                <NavActionButton
                    to="/check-in"
                    label="Check-in"
                    icon={<UserCheck size={16} />}
                />
                <NavActionButton
                    to="/check-out"
                    label="Check-out"
                    icon={<UserMinus size={16} />}
                />
                <NavActionButton
                    to="/servicios/asignar"
                    label="Asignar servicio"
                    icon={<HandPlatter size={16} />}
                />
            </div>
            
            {/* Fila 2 */}
            <div className="flex flex-wrap gap-2">
                <NavActionButton
                    to="/incidentes/reporte"
                    label="Reporte de incidente"
                    icon={<CircleAlert size={16} />}
                />
                <NavActionButton
                    to="/mantenimiento/reporte"
                    label="Reporte de mantenimiento"
                    icon={<Wrench size={16} />}
                />
                <NavActionButton
                    to="/limpieza/reporte"
                    label="Reporte de limpieza"
                    icon={<BrushCleaning size={16} />}
                />
            </div>
        </div>
    );
};

export default DashboardActions;
