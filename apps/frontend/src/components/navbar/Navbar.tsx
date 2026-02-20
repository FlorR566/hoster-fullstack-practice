import React from "react";
import { House, Hotel, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

const baseClasses =
    "w-[40px] h-[40px] flex items-center justify-center rounded-lg transition p-1";

const Navbar: React.FC = () => {
    return (
        <aside className="w-[80px] h-screen bg-[var(--light-main2)] flex flex-col items-center py-4">
            {/* Logo empresa */}
            <div className="mb-1 mt-2 flex justify-center w-full">
                <img
                    src="/images/Hoster.png"
                    alt="Hoster"
                    className="w-10 h-10 object-contain"
                />
            </div>

            {/* Línea separadora */}
            <div className="mt-4 w-8 h-[1px] bg-[#D4D4D4]" />

            {/* Menú */}
            <nav className="flex flex-col items-center gap-4 mt-6">
                {/* Inicio */}
                <NavLink to="/dashboard">
                    {({ isActive }) => (
                        <button
                            className={`${baseClasses} ${isActive
                                    ? "bg-[var(--light-accent)] text-[#F7F7FF]"
                                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-muted)]"
                                }`}
                            title="Inicio"
                        >
                            <House size={28} />
                        </button>
                    )}
                </NavLink>

                {/* Alojamiento */}
                <NavLink to="/roomsOverview">
                    {({ isActive }) => (
                        <button
                            className={`${baseClasses} ${isActive
                                    ? "bg-[#5451FF] text-[#F7F7FF]"
                                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-muted)]"
                                }`}
                            title="Alojamiento"
                        >
                            <Hotel size={28} />
                        </button>
                    )}
                </NavLink>

                {/* Reportes */}
                <NavLink to="/reports">
                    {({ isActive }) => (
                        <button
                            className={`${baseClasses} ${isActive
                                    ? "bg-[#5451FF] text-[#F7F7FF]"
                                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-muted)]"
                                }`}
                            title="Reportes"
                        >
                            <FileText size={28} />
                        </button>
                    )}
                </NavLink>
            </nav>
        </aside>
    );
};

export default Navbar;