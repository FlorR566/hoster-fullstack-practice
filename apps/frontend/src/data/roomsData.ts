import type { RoomProps } from "../types/room";

export const roomsData: (RoomProps & { code: string })[] = [
  // Habitaciones
  { id: 1, code: "H-01", type: "Presidencial", status: "Ocupada", capacity: 2 },
  { id: 2, code: "H-02", type: "Deluxe", status: "Disponible", capacity: 2 },
  { id: 3, code: "H-03", type: "Deluxe", status: "Limpieza", capacity: 4 },
  { id: 4, code: "H-04", type: "Deluxe", status: "Disponible", capacity: 4 },
  { id: 5, code: "H-05", type: "Deluxe", status: "Disponible", capacity: 2 },
  { id: 6, code: "H-06", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 7, code: "H-07", type: "Estandar", status: "Disponible", capacity: 2 },
  { id: 8, code: "H-08", type: "Estandar", status: "Disponible", capacity: 3 },
  { id: 9, code: "H-09", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 10, code: "H-10", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 11, code: "H-11", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 12, code: "H-12", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 13, code: "H-13", type: "Estandar", status: "Disponible", capacity: 3 },
  { id: 14, code: "H-14", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 15, code: "H-15", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 16, code: "H-16", type: "Estandar", status: "Disponible", capacity: 4 },
  { id: 17, code: "H-17", type: "Estandar", status: "Disponible", capacity: 2 },
  { id: 18, code: "H-18", type: "Estandar", status: "Disponible", capacity: 4 },
  // Cabañas
  { id: 19, code: "C-01", type: "Presidencial", status: "Ocupada", capacity: 2 },
  { id: 20, code: "C-02", type: "Estandar", status: "Disponible", capacity: 2 },
  { id: 21, code: "C-03", type: "Estandar", status: "Disponible", capacity: 3 },
  { id: 22, code: "C-04", type: "Estandar", status: "Disponible", capacity: 2 },
  { id: 23, code: "C-05", type: "Deluxe", status: "Disponible", capacity: 4 },
  { id: 24, code: "C-06", type: "Deluxe", status: "Disponible", capacity: 2 },
];