import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import reportsData from "../../data/reports.json";

const ReportDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const report = reportsData.find(
        (r) => r.idReporte === id
    );

    if (!report) {
        return (
            <div className="p-6 font-poppins">
                Reporte no encontrado
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[var(--light-text)] hover:opacity-70 transition"
                >
                    <ArrowLeft size={22} />
                </button>

                <h1 className="font-poppins text-[28px] font-medium text-[var(--light-text)]">
                    Reporte {report.idReporte}
                </h1>

            </div>

            {/* Contenido */}
            <div className="text-[16px]">
                <p>Alojamiento: Hotel Los Álamos</p>
                <p>Periodo analizado: {report.periodoAnalizado}</p>
                <p>Fecha de generación: {report.fecha}</p>
            </div>

            <div className="mt-3">
                <p className="text-[20px] font-semibold">Resumen general del período:</p>
                <p className="text-[16px]">{report.resumen}</p>
            </div>

            <div className="mt-3">
                <p className="text-[20px] font-semibold">Ocupación y estadías:</p>
                <ul className="list-disc pl-6 font-poppins text-[16px]">
                    {report.insights?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-3">
                <p className="text-[20px] font-semibold">Servicios adicionales:</p>
                <ul className="list-disc pl-6 font-poppins text-[16px]">
                    {report.observaciones?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-3">
                <p className="text-[20px] font-semibold">
                    Incidencias
                </p>

                <ul className="list-disc pl-6 font-poppins text-[15px]">
                    {report.incidencias?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

             <div className="mt-3">
                <p className="text-[20px] font-semibold">Cierre descriptivo:</p>
                <p className="text-[16px]">{report.cierre}</p>
            </div>
        </div>
    );
};

export default ReportDetail;