export type MaintenanceStatus = "Completado" | "Pendiente";

export interface MaintenanceReport {
	id: string;
	roomId: string; // H04-D
	status: MaintenanceStatus;
	reportDate: string;
	description: string;
}
