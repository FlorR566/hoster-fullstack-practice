import React from "react";

//iconos
import { Sparkles } from "lucide-react"

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const NewReportModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const years = [2026, 2025, 2024, 2023, 2022];

    const months = [
        { value: "01", label: "Enero" },
        { value: "02", label: "Febrero" },
        { value: "03", label: "Marzo" },
        { value: "04", label: "Abril" },
        { value: "05", label: "Mayo" },
        { value: "06", label: "Junio" },
        { value: "07", label: "Julio" },
        { value: "08", label: "Agosto" },
        { value: "09", label: "Septiembre" },
        { value: "10", label: "Octubre" },
        { value: "11", label: "Noviembre" },
        { value: "12", label: "Diciembre" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative rounded-2xl p-6 w-[450px] shadow-xl bg-[var(--light-card)]">
                <h2 className="flex items-center gap-2 font-poppins text-[20px] font-medium mb-4 font-regular">
                    <Sparkles size={22} />
                    Nuevo reporte
                </h2>

                {/* Formulario */}
                <div className="flex flex-col gap-2 mt-4">

                    <label
                        htmlFor="reportId"
                        className="font-poppins text-[16px] text-[var(--light-text)]"
                    >
                        Report ID
                    </label>

                    <input
                        id="reportId"
                        type="text"
                        placeholder="R-0000000146"
                        className="h-[44px] px-4 rounded-xl border border-gray-300 outline-none font-poppins text-[14px] focus:border-[var(--light-main)] focus:ring-2 focus:ring-[var(--light-main)]/20 bg-[var(--light-input)] transition" />

                    <div className="flex flex-col gap-2 mt-4">

                        <label
                            htmlFor="year"
                            className="font-poppins text-[16px] text-[var(--light-text)]"
                        >
                            Año
                        </label>

                        <select
                            id="year"
                            className="h-[44px] px-4 rounded-xl border border-gray-300 outline-none font-poppins text-[14px] focus:border-[var(--light-main)] focus:ring-2 focus:ring-[var(--light-main)]/20 bg-[var(--light-bg-register)] transition"
                        >
                            <option value="">Seleccionar año</option>

                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div className="flex flex-col gap-2 mt-4">

                        <label
                            htmlFor="month"
                            className="font-poppins text-[16px] text-[var(--light-text)]"
                        >
                            Mes
                        </label>

                        <select
                            id="month"
                            className="h-[44px] px-4 rounded-xl border border-gray-300 outline-none font-poppins text-[14px] bg-[var(--light-bg-register)] focus:border-[var(--light-main)] focus:ring-2 focus:ring-[var(--light-main)]/20 transition"
                        >
                            <option value="">Seleccionar mes</option>

                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}

                        </select>

                    </div>
                </div>
                <div className="flex justify-end mt-6 gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-full bg-[var(--boton-principal)] transition"
                    >
                        Cancelar
                    </button>

                    <button
                        className="px-4 py-2 rounded-full bg-[var(--light-accent)] text-[var(--light-bg)] font-poppins hover:brightness-95 transition"
                    >
                        Generar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewReportModal;