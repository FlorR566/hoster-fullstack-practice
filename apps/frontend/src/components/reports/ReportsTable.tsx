import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export type Report = {
  id: number;
  report_date: string;
  analyzed_period: string;
  description: string;
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
          <thead className="bg-[#5451FF] text-left text-[var(--light-title-table)]">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Período analizado</th>
              <th className="px-4 py-3 font-medium">Descripción (IA)</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-[var(--light-text)] hover:bg-[var(--light-main2)]/40 transition">
                <td className="px-4 py-3 bg-[var(--light-column1)]">R-{report.id.toString().padStart(6, '0')}</td>
                <td className="px-4 py-3 bg-[var(--light-column2)]">{report.report_date}</td>
                <td className="px-4 py-3 bg-[var(--light-column1)]">{report.analyzed_period}</td>
                <td className="px-4 py-3 bg-[var(--light-column2)] max-w-xs truncate">{report.description}</td>
                <td className="px-4 py-3 text-right bg-[var(--light-column2)]">
                  <button
                    onClick={() => navigate(`/reports/${report.id}`)}
                    className="inline-flex items-center gap-2 text-[var(--light-text)] font-medium hover:opacity-70 transition"
                  >
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