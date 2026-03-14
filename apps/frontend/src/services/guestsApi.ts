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
    const response = await fetch(
      `http://localhost:5000/api/guest/document/${numberDocument}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
};