// src/api/serviceApi.ts

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  currencyId: number;
}

export const serviceApi = {
  async getServices(): Promise<Service[]> {
    const response = await fetch(
      "http://localhost:5000/api/service/get-services",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error obteniendo servicios");
    }

    return data;
  },
};