import React from "react";
import { House, Hotel, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <aside className="w-[80px] h-screen bg-[var(--card)] flex flex-col items-center py-4">
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
                <Link to="/dashboard">
                    <button
                        className="w-[35px] h-[35px] flex items-center justify-center rounded-lg
                     text-[var(--color-text-primary)]
                     hover:bg-[var(--color-muted)] transition"
                        title="Inicio"
                    >
                        <House size={28} />
                    </button>
                </Link>

                {/* Alojamiento */}
                <Link to={"/roomsOverview"}>
                    <button
                        className="w-[35px] h-[35px] flex items-center justify-center rounded-lg
                     text-[var(--color-text-primary)]
                     hover:bg-[var(--color-muted)] transition"
                        title="Alojamiento"
                    >
                        <Hotel size={28} />
                    </button>
                </Link>
                {/* Reportes */}
                <button
                    className="w-[35px] h-[35px] flex items-center justify-center rounded-lg
                     text-[var(--color-text-primary)]
                     hover:bg-[var(--color-muted)] transition"
                    title="Reportes"
                >
                    <FileText size={28} />
                </button>
            </nav>
        </aside>
    );
};

export default Navbar;
