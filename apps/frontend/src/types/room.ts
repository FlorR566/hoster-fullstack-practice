type RoomType = "Deluxe" | "Presidencial" | "Estandar";
type RoomStatus = "Disponible" | "Ocupada" | "Limpieza";

export type RoomProps = {
  id: string;
  type: RoomType;
  status: RoomStatus;
  capacity: number;
};