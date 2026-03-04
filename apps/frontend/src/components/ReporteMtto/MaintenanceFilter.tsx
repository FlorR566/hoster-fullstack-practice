import { Calendar, ChevronDown } from "lucide-react";

interface MaintenanceFiltersProps {
	filters: {
		date: string;
		status: string;
	};
	onChange: (key: string, value: string) => void;
}

export const MaintenanceFilters = ({
	filters,
	onChange,
}: MaintenanceFiltersProps) => {
	return (
		<div className="font-['Poppins'] flex items-center gap-8 mt-8 text-gray-700">
			{/* Filtro de Fecha */}
			<div className="flex items-center gap-2">
				<span className="text-[16px] text-[var(--light-text)] opacity-70">
					Fecha:
				</span>
				<input
					type="date"
					value={filters.date}
					onChange={(e) => onChange("date", e.target.value)}
					className="h-9 rounded-lg px-3 bg-white/60 border border-black/10 text-[var(--light-text)] outline-none w-[165px]"
				/>
			</div>

			{/* Filtro de Estado */}
			<div className="flex items-center gap-2">
				<span className="text-[16px] text-[var(--light-text)] opacity-70">
					Estado:
				</span>
				<div className="relative">
					<select
						value={filters.status}
						onChange={(e) => onChange("status", e.target.value)}
						className="h-9 rounded-lg px-3 bg-white/60 border border-black/10 text-[var(--light-text)] outline-none appearance-none pr-10 min-w-[140px]"
					>
						<option value="Todo">Todo</option>
						<option value="Completado">Completado</option>
						<option value="Pendiente">Pendiente</option>
					</select>
					<ChevronDown
						className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--light-text)] pointer-events-none"
						size={18}
					/>
				</div>
			</div>
		</div>
	);
};
