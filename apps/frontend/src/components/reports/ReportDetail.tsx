import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { reportsService, Report } from "../../services/reportsService";

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await reportsService.getById(Number(id));
        setReport(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if (loading) return <div className="p-6">Cargando reporte...</div>;
  if (!report) return <div className="p-6">Reporte no encontrado</div>;

  return (
    <div className="p-6">
      {/* Header igual */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[var(--light-text)] hover:opacity-70 transition">
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-poppins text-[28px] font-medium text-[var(--light-text)]">
          Reporte #{report.id}
        </h1>
      </div>

      <div className="text-[16px]">
        <p>Fecha de generación: {report.report_date}</p>
        <p>Período analizado: {report.analyzed_period}</p>
      </div>

      <div className="mt-6">
        <p className="text-[20px] font-semibold">Análisis generado por IA:</p>
        <p className="text-[16px] mt-2 whitespace-pre-wrap">{report.description}</p>
      </div>
    </div>
  );
};

export default ReportDetail;