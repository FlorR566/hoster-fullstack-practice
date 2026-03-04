import { useState } from "react";
import { ArrowLeft, Wrench } from "lucide-react";
import NavActionButton from "../common/Navigation/NavActionButton";

interface HeaderProps {
	onNewReport: () => void;
	activeTab: string;
	onTabChange: (tab: string) => void;
}

export const MaintenanceHeader = ({
	onNewReport,
	activeTab,
	onTabChange,
}: HeaderProps) => {
	const TABS = ["Vista global", "Mantenimiento", "Limpieza"];

	return (
		<header className="font-['Poppins'] flex flex-col gap-6">
			<h1 className="text-[var(--light-text)] text-[30px] font-medium flex items-center gap-2">
				<ArrowLeft className="cursor-pointer" /> Mantenimiento
			</h1>

			<div className="flex justify-between items-center">
				{/* BUTTONS */}
				<nav className="flex gap-3 bg-[var(--light-main2)] max-w-[438px] rounded-lg p-1 ">
					{TABS.map((tab) => (
						<button
							key={tab}
							onClick={() => onTabChange(tab)}
							className={`px-2 whitespace-nowrap text-[16px] h-[42px] font-normal rounded-md transition 
								${activeTab === tab ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] shadow-sm" : "text-[var(--light-text)] hover:bg-white/10"}`}
						>
							{tab}
						</button>
					))}
				</nav>

				{/* <button
					onClick={onNewReport}
					className="bg-[#C1C1FF] text-[#4F46E5] px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-opacity-80 transition-all"
				>
					<Wrench size={18} /> Nuevo reporte
				</button> */}

				<NavActionButton
					to="reporte"
					onClick={onNewReport}
					label="Nuevo reporte"
					icon={<Wrench size={16} />}
				/>
			</div>
		</header>
	);
};
