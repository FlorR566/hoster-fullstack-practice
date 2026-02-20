import React, { useState } from "react";
import { House, Hotel, FileText, LogOut, ChevronLeft, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";

const baseBtn = "flex items-center gap-3 rounded-lg transition px-2 py-2 w-full";
const iconWrapper = "w-[40px] h-[40px] flex items-center justify-center rounded-lg";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        console.log("logout");
    };

    return (
        <aside className={`relative h-screen bg-[var(--light-main2)] flex flex-col py-4 transition-all duration-300 ${isOpen ? "w-[243px]" : "w-[80px]"}`}>
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 mt-2">
                <img
                    src="/images/Hoster.png"
                    alt="Hoster"
                    className="w-12 h-12 object-contain"
                />
                {isOpen && (
                    <span className="font-semibold text-[var(--light-text)]">
                        Hoster
                    </span>
                )}
            </div>

            {/* 🔘 Botón colapsar  */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1/2 -translate-y-1/2 -right-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[var(--light-main2)] text-[var(--light-text)] shadow-sm transition"
                title={isOpen ? "Cerrar menú" : "Abrir menú"}>
                <ChevronLeft
                    size={14}
                    className={`transition-transform ${!isOpen ? "rotate-180" : ""}`}
                />
            </button>


            {/* Línea separadora */}
            <div className="mt-4 flex justify-center">
                <div className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-[180px]" : "w-8"}`} />
            </div>

            {/* Menú */}
            <nav className="flex flex-col gap-2 mt-8 px-3">
                <NavLink to="/dashboard">
                    {({ isActive }) => (
                        <div
                            className={`${baseBtn} ${isActive
                                ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
                                : "text-[var(--light-text)]"
                                }`}
                        >
                            <div className={iconWrapper}>
                                <House size={26} />
                            </div>
                            {isOpen && <span>Inicio</span>}
                        </div>
                    )}
                </NavLink>

                <NavLink to="/roomsOverview">
                    {({ isActive }) => (
                        <div
                            className={`${baseBtn} ${isActive
                                ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
                                : "text-[var(--light-text)]"
                                }`}
                        >
                            <div className={iconWrapper}>
                                <Hotel size={26} />
                            </div>
                            {isOpen && <span>Alojamiento</span>}
                        </div>
                    )}
                </NavLink>

                <NavLink to="/reports">
                    {({ isActive }) => (
                        <div
                            className={`${baseBtn} ${isActive
                                ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
                                : "text-[var(--light-text)]"
                                }`}
                        >
                            <div className={iconWrapper}>
                                <FileText size={26} />
                            </div>
                            {isOpen && <span>Reportes</span>}
                        </div>
                    )}
                </NavLink>
            </nav>

            {/* Tema (Sol / Luna) */}
            <div className="mt-auto px-3">
                <button
                    className={`${baseBtn} text-[var(--light-text)] hover:bg-black/5`}
                    title="Cambiar tema"
                >
                    <div className={iconWrapper}>
                        <Sun size={22} />
                    </div>

                    {isOpen && (
                        <div className="ml-auto mr-2">
                            <Moon size={20} />
                        </div>
                    )}
                </button>
            </div>

            {/* Logout */}
            <div className="px-3 mb-3">
                <button
                    onClick={handleLogout}
                    className={`${baseBtn} text-[var(--light-text)] hover:text-red-600 hover:bg-red-500/10`}
                >
                    <div className={iconWrapper}>
                        <LogOut size={24} />
                    </div>
                    {isOpen && <span>Cerrar sesión</span>}
                </button>
            </div>
        </aside>
    );
};

export default Navbar;