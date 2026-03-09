import React from "react";
import { useNavigate } from "react-router-dom";

import { ArrowUpRight } from "lucide-react";

export type Report = {
    idReporte: string;
    fecha: string;
    periodoAnalizado: string;
    descripcion: string;
};

type Props = {
    reports: Report[];
};

const ReportsTable: React.FC<Props> = ({ reports }) => {
    const navigate = useNavigate();

    return (
        <div className="px-6">
            <div className="overflow-x-auto rounded-xl border border-[var(--light-text)]">
                <table className="min-w-full font-poppins text-[15px]">

                    {/* Header */}
                    <thead className="bg-[#5451FF] text-left text-[var(--light-title-table)]">
                        <tr className="text-[var(--light-title-table)]">
                            <th className="px-4 py-3 font-medium">ID Reporte</th>
                            <th className="px-4 py-3 font-medium">Fecha</th>
                            <th className="px-4 py-3 font-medium">Periodo analizado</th>
                            <th className="px-4 py-3 font-medium">Descripción</th>
                            <th className="px-4 py-3 font-medium"></th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {reports.map((report) => (
                            <tr
                                key={report.idReporte}
                                className="border-t border-[var(--light-text)] hover:bg-[var(--light-main2)]/40 transition">
                                {/* Columna 1 */}
                                <td className="px-4 py-3 bg-[var(--light-column1)]">
                                    <button
                                        onClick={() => navigate(`/reports/${report.idReporte}`)}
                                        className="text-[var(--light-text)]"
                                    >
                                        {report.idReporte}
                                    </button>
                                </td>

                                {/* Columna 2 */}
                                <td className="px-4 py-3 bg-[var(--light-column2)]">
                                    {report.fecha}
                                </td>

                                {/* Columna 3 */}
                                <td className="px-4 py-3 bg-[var(--light-column1)]">
                                    {report.periodoAnalizado}
                                </td>

                                {/* Columna 4 */}
                                <td className="px-4 py-3 bg-[var(--light-column2)]">
                                    {report.descripcion}
                                </td>


                                {/* Columna acción */}
                                <td className="px-4 py-3 text-right bg-[var(--light-column2)]">
                                    <button className=" inline-flex items-center gap-2 text-[var(--light-text)] font-medium">
                                        <ArrowUpRight size={20} />
                                        Ver más
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ReportsTable;