export type MaintenanceStatus = "Completado" | "Pendiente";

export interface MaintenanceReport {
	id: string;
	roomId: string; // H04-D
	status: MaintenanceStatus;
	reportDate: string;
	description: string;
	time: string;
	duration: string;
	owner: string;
}

export type ReportCategory = "Mantenimiento" | "Limpieza";

export interface NewMaintenanceReport {
	category: ReportCategory;
	id: string; // M-0000000150
	roomId: string;
	duration: string;
	owner: string;
	reportDate: string;
	startTime: string;
	description: string;
}
