import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();

	return (
		<header className="font-['Poppins'] flex flex-col gap-6">
			<div className="flex items-center gap-3">
				<h1 className="text-[var(--light-text)] text-[30px] font-medium flex items-center gap-2">
					<ArrowLeft
						className="text-[var(--light-text)] cursor-pointer hover:opacity-70 transition"
						size={22}
						onClick={() => navigate("/dashboard")}
					/>{" "}
					Mantenimiento
				</h1>
			</div>

			<div className="flex justify-between items-center">
				{/* BUTTONS */}
				<nav className="flex gap-3 bg-[var(--light-main2)] max-w-[438px] rounded-lg p-1 ">
					{TABS.map((tab) => (
						<button
							key={tab}
							onClick={() => onTabChange(tab)}
							className={`px-2 whitespace-nowrap text-[16px] h-[38px] font-normal rounded-md transition 
								${activeTab === tab ? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)] shadow-sm" : "text-[var(--light-text)] hover:bg-white/30"}`}
						>
							{tab}
						</button>
					))}
				</nav>

				<NavActionButton
					to=""
					onClick={onNewReport}
					label="Nuevo reporte"
					icon={<Wrench size={16} />}
				/>
			</div>
		</header>
	);
};