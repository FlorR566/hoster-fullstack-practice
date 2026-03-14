import React, { useState } from "react";
import { Sparkles, Loader2, X } from "lucide-react";
import { reportsService } from "../../services/reportsService";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onReportGenerated?: () => void;
};

const NewReportModal: React.FC<Props> = ({ isOpen, onClose, onReportGenerated }) => {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const years = [2026, 2025, 2024, 2023, 2022];

    const months = [
        { value: "01", label: "Enero" }, { value: "02", label: "Febrero" },
        { value: "03", label: "Marzo" }, { value: "04", label: "Abril" },
        { value: "05", label: "Mayo" }, { value: "06", label: "Junio" },
        { value: "07", label: "Julio" }, { value: "08", label: "Agosto" },
        { value: "09", label: "Septiembre" }, { value: "10", label: "Octubre" },
        { value: "11", label: "Noviembre" }, { value: "12", label: "Diciembre" },
    ];

    const handleGenerate = async () => {
        if (!month || !year) {
            setError("Selecciona año y mes");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await reportsService.generate(parseInt(month), parseInt(year));
            alert("✅ Reporte generado con IA correctamente!");
            onReportGenerated?.();
            onClose();
            setMonth("");
            setYear("");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to fetch");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative rounded-2xl p-6 w-[450px] shadow-xl bg-[var(--light-card)]">
                {/* Botón X cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[var(--light-text)] hover:opacity-70 transition"
                >
                    <X size={24} />
                </button>

                <h2 className="flex items-center gap-2 font-poppins text-[20px] font-medium mb-4 font-regular">
                    <Sparkles size={22} />
                    Nuevo reporte
                </h2>

                {/* Formulario */}
                <div className="flex flex-col gap-2 mt-4">
                    {/* Reporte ID */}
                    <label htmlFor="reportId" className="font-poppins text-[16px] text-[var(--light-text)]">
                        Reporte ID
                    </label>
                    <input
                        id="reportId"
                        type="text"
                        value="R-0000000146"
                        readOnly
                        className="h-[44px] px-4 rounded-xl border border-gray-300 outline-none font-poppins text-[14px] focus:border-[var(--light-main)] focus:ring-2 focus:ring-[var(--light-main)]/20 bg-[var(--light-input)] transition"
                    />

                    {/* Año */}
                    <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="year" className="font-poppins text-[16px] text-[var(--light-text)]">
                            Año
                        </label>
                        <select
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="h-[44px] px-4 rounded-xl border border-gray-300 outline-none font-poppins text-[14px] focus:border-[var(--light-main)] focus:ring-2 focus:ring-[var(--light-main)]/20 bg-[var(--light-bg-register)] transition"
                        >
                            <option value="">Seleccionar</option>
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Mes */}
                    <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="month" className="font-poppins text-[16px] text-[var(--light-text)]">
                            Mes
                        </label>
                        <select
                            id="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="h-[44px] px-4 rounded-xl border border-gray-300 outline-none font-poppins text-[14px] bg-[var(--light-bg-register)] focus:border-[var(--light-main)] focus:ring-2 focus:ring-[var(--light-main)]/20 transition"
                        >
                            <option value="">Seleccionar</option>
                            {months.map((m) => (
                                <option key={m.value} value={m.value}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {/* Botones */}
                <div className="flex justify-end mt-6 gap-2">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 rounded-full bg-[var(--boton-principal)] transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="px-4 py-2 rounded-full bg-[var(--light-accent)] text-[var(--light-bg)] font-poppins hover:brightness-95 transition flex items-center gap-2"
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading ? "Generando..." : "Generar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewReportModal;