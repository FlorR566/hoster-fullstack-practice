import { API_ENDPOINTS } from "../constants/routes";

// Ajustá este type si ya tenés uno definido en ../types
export interface Reserve {
    id: number;
    night: number;
    checkIn: string;
    checkOut: string;
    stayPrice: number;
    servicePrice: number;
    observation: string;
    currencyId: number;
    guestId: number;
    originId: number;
    serviceId: number;
    userId: number;
    unitId: number;
}

export const reserveApi = {
    async getReserveById(id: number | string): Promise<Reserve> {
        const response = await fetch(`http://localhost:5000/api/reserve/get-reserve/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        );

        console.log(response)
        const data = await response.json()
        console.log(data)
        // if (!response.ok) {
        //   throw new Error(result.error || "Error fetching reserve");
        // }

       return data;
    },

    //   async getAllReserves(): Promise<Reserve[]> {
    //     const response = await fetch(
    //       `${API_ENDPOINTS.BASE}${API_ENDPOINTS.RESERVE.GET_ALL}`,
    //       {
    //         method: "GET",
    //       }
    //     );

    //     const result = await response.json();

    //     if (!response.ok) {
    //       throw new Error(result.error || "Error fetching reserves");
    //     }

    //     return result;
    //   },

    //   async createReserve(data: Partial<Reserve>): Promise<Reserve> {
    //     const response = await fetch(
    //       `${API_ENDPOINTS.BASE}${API_ENDPOINTS.RESERVE.CREATE}`,
    //       {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data),
    //       }
    //     );

    //     const result = await response.json();

    //     if (!response.ok) {
    //       throw new Error(result.error || "Error creating reserve");
    //     }

    //     return result;
    //   },
};