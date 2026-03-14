// src/utils/mapReserve.ts

import { Reserva } from "../components/common/modals/ModalReserva";

export const mapReserve = (res: any): Reserva => ({
  id: res.id.toString(),
  nombre: res.guest?.name || "",
  telefono: res.guest?.phone || "",
  documento: res.guest?.numberDocument || "",
  email: res.guest?.email || "",
  habitacion: res.unitId ? `Habitación ${res.unitId}` : "N/A", // ajustá según tu lógica
  personas: parseInt(res.guestAdult || "0") + parseInt(res.guestChild || "0"),
  fechaLlegada: res.estimatedCheckIn || "",
  fechaSalida: res.estimatedCheckOut || "",
  pago: res.totalPrice ? `Total: ${res.totalPrice}` : "Pendiente", // ajustá según tu lógica
  serviciosAdicionales: res.servicePrice ? parseFloat(res.servicePrice) : 0,
  nota: res.observation || "",
  guestId: res.guestId,
  guest: res.guest,
});