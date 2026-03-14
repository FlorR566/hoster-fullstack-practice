import React, { useState, useEffect } from 'react'
import SearchInput from '../components/common/busqueda/SearchInput';
import NavActionButton from "../components/common/Navigation/NavActionButton";
import { Sparkles } from "lucide-react"
import ReportsTable from '../components/reports/ReportsTable';
import { reportsService, type Report } from '../services/reportsService';
import NewReportModal from "../components/reports/NewReportModal";
import { Pagination } from "../components/common/Navigation/Pagination";
import { paginate } from "../utils/pagination";

const Reports: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    const ITEMS_PER_PAGE = 10;

    // Cargar reportes desde el backend (con IA)
    useEffect(() => {
        const loadReports = async () => {
            try {
                const data = await reportsService.getAll();
                setReports(data);
            } catch (error) {
                console.error('Error cargando reportes:', error);
            } finally {
                setLoading(false);
            }
        };
        loadReports();
    }, []);

    // Refrescar lista después de generar un nuevo reporte
    const handleReportGenerated = async () => {
        try {
            const updatedReports = await reportsService.getAll();
            setReports(updatedReports);
            setCurrentPage(1); // volver a la primera página
        } catch (error) {
            console.error('Error actualizando lista:', error);
        }
    };

    const { totalPages, paginatedData } = paginate(
        reports,
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

            {/* Tabla o loading */}
            {loading ? (
                <div className="px-6 py-12 text-center text-[var(--light-text)]">
                    Cargando reportes generados por IA...
                </div>
            ) : (
                <ReportsTable reports={paginatedData} />
            )}

            {/* Paginación */}
            {!loading && (
                <div className="px-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}

            {/* Modal */}
            <NewReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onReportGenerated={handleReportGenerated}
            />
        </div>
    )
}

export default Reports