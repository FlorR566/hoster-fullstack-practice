export interface FormData {
  recepcionista: string;
  canalReserva: string;
  idReserva: string;
  nombreCompleto: string;
  pais: string;
  tipoDocumento: string;
  documentoIdentidad: string;
  email: string;
  telefono: string;
  fechaCheckin: string;
  fechaCheckout: string;
  cantidadNoches: string;
  ingresaVehiculo: "Si" | "No";
  horaLlegada: string;
  horaCheckout: string;
  tipoAlojamiento: string;
  numeroAlojamiento: string;
  adultos: number;
  ninos: number;
  habitaciones: number;
  serviciosAgregados: {
    nombre: string;
    precio: string;
    fecha?: string;
  }[];
  estacionamiento: "Si" | "No";
  patente: string;
  precioPorNoche: string;
}

export interface EconData {
  medioPago: string;
  estadoPago: "Parcial" | "Total";
  montoAbona: string;
  saldoPendiente: string;
  nroRecibo: string;
  nota: string;
}