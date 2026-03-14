import { API_ENDPOINTS } from "../constants/routes";

// Ajustá este type si ya tenés uno definido en ../types
export interface Reserve {
  id: number;
  night: number;
  checkIn: string | null;
  checkOut: string | null;
  estimatedCheckIn: string;       // formato "12-03-2026"
  estimatedCheckOut: string;      // formato "14-03-2026"
  estimatedCheckInTime: string;   // "20:53:00"
  estimatedCheckOutTime: string;  // "08:53:00"
  stayPrice: string;              // "200.00"
  servicePrice: string;           // "0.00"
  totalPrice: string;             // "200.00"
  observation: string;
  currencyId: number;
  guestId: number;
  guestAdult: string;             // "1"
  guestChild: string;             // "0"
  originId: number;
  serviceId?: number;
  userId: number;
  unitId: number;
  isCancelled: boolean;
  cancelledAt?: string | null;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  numberDocument: string;
}

// Extendemos Reserve 
export interface ReserveWithGuest extends Reserve {
  guest?: Guest; 
  createdAt: string;
  updatedAt: string;
}



export const reserveApi = {
  async getReserveById(id: number | string): Promise<Reserve> {
    const token = localStorage.getItem("example_token");
    const response = await fetch(`http://localhost:5000/api/reserve/get-reserve/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    }
    );
    const data = await response.json()
    return data;
  },

  async getAllReserves(): Promise<Reserve[]> {
    const token = localStorage.getItem("example_token");
    const response = await fetch(
      // `${API_ENDPOINTS.BASE}${API_ENDPOINTS.RESERVE.GET_ALL}`,
      `http://localhost:5000/api/reserve/get-reserves`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error fetching reserves");
    }

    return result;
  },

  async createReserve(data: any) {
    const token = localStorage.getItem("example_token");

    const response = await fetch(
      "http://localhost:5000/api/reserve/create-reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error creando la reserva");
    }

    return result;
  },
};