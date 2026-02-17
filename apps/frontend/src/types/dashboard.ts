export interface ActividadDiariaItem {
  reservaId: number;
  estado: "Check-in" | "Check-out";
  estadoDetalle: string;
  cliente: {
    nombre: string;
  };
  personas: number;
  pago: "parcial" | "completo" | "pendiente";
  horarioEstimado?: {
    llegada?: string;
    salida?: string;
  };
  habitacion: number;
  serviciosAdicionales: {
    cantidad: number;
    parking: boolean;
  };
  fechas: {
    llegada: string;
    salida: string;
  };
}

export interface DashboardData {
  actividadDiaria: ActividadDiariaItem[];
}
