export interface Guest {
  id: number;
  name: string;
  numberDocument: string;
  typeDocument: string;
  country: string;
  email: string;
  phone: string;
}

export const guestApi = {
  async getGuestByDocument(numberDocument: string): Promise<Guest | null> {
    const token = localStorage.getItem("example_token");
    const response = await fetch(
      `http://localhost:5000/api/guest/document/${numberDocument}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );

    if (response.status === 404) {
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error buscando huésped");
    }

    return data;
  },

  // Crear un huésped si no existe
  async createGuest(payload: Omit<Guest, "id">): Promise<Guest> {
    const token = localStorage.getItem("example_token");
    const response = await fetch(
      "http://localhost:5000/api/guest/create-guest",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error creando huésped");
    }

    return response.json();
  },
};