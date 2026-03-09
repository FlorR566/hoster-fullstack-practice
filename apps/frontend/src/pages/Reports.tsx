import React, { useState } from 'react'
//common 
import SearchInput from '../components/common/busqueda/SearchInput';
import NavActionButton from "../components/common/Navigation/NavActionButton";
//iconos
import { Sparkles } from "lucide-react"
// info tables
import ReportsTable from '../components/reports/ReportsTable';
import reportsData from "../data/reports.json"

// modal
import NewReportModal from "../components/reports/NewReportModal";

const Reports: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="h-[100vh] overflow-y-auto scroll-y-auto p-6">

            <h1 className="font-poppins font-medium text-[35px] text-[var(--light-text)] px-6 pb-4">
                Reportes
            </h1>

            {/* Acciones */}
            <div className="flex items-center justify-between px-6 mb-6">
                <SearchInput placeholder="Buscar reporte..." />

                {/* Botón */}
                <NavActionButton
                    icon={<Sparkles size={18} />}
                    label="Nuevo reporte"
                    onClick={() => setIsModalOpen(true)}
                />

            </div>

            <ReportsTable reports={reportsData} />

            {/* Modal */}
            <NewReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}

export default Reports