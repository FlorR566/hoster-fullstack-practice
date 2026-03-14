import { roomsData } from "../data/roomsData"; 
async function syncUnits() {
  try {
    // 1️⃣ Traer unidades existentes
    const resGet = await fetch("http://localhost:5000/get-units");
    const existingUnits = await resGet.json();

    for (const room of roomsData) {
      const exists = existingUnits.some((u: any) => u.type === room.code);

      if (!exists) {
        const payload = {
          type: room.code,         // ⚡ code de room como type en DB
          capacity: room.capacity,
          state: "Disponible",
          price: 100               // o el valor que quieras
        };

        try {
          const resPost = await fetch("http://localhost:5000/create-unit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });

          const data = await resPost.json();

          if (resPost.ok) {
            console.log("Unidad creada:", data.unit.type);
          } else {
            console.error("Error creando unidad:", data.error);
          }
        } catch (err) {
          console.error("Error POST unidad:", room.code, err);
        }
      } else {
        console.log("Unidad ya existe:", room.code);
      }
    }
  } catch (err) {
    console.error("Error trayendo unidades existentes:", err);
  }
}

syncUnits();