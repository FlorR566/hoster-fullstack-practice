import React from 'react'
//common 
import SearchInput from '../components/common/busqueda/SearchInput';
import NavActionButton from "../components/common/Navigation/NavActionButton";
//iconos
import { Search, Sparkles } from "lucide-react"
// info tables
import ReportsTable from '../components/reports/ReportsTable';
import reportsData from "../data/reports.json"

const Reports: React.FC = () => {
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
                    to="/reports/new"
                    icon={<Sparkles size={18} />}
                    label="Nuevo reporte"
                />

            </div>

            <ReportsTable reports={reportsData} />
        </div>
    )
}

export default Reports