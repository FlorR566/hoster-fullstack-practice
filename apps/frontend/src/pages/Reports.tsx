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

//paginacion
import { Pagination } from "../components/common/Navigation/Pagination";
import { paginate } from "../utils/pagination";

const Reports: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    const { totalPages, paginatedData } = paginate(
        reportsData,
        currentPage,
        ITEMS_PER_PAGE
    );

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

            <ReportsTable reports={paginatedData} />

            <div className="px-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
            {/* Modal */}
            <NewReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}

export default Reports