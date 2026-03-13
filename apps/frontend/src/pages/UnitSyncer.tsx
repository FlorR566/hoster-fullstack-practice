import { useEffect, useRef } from "react";
import { roomsData } from "../data/roomsData";

export const UnitSyncer = () => {

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    (async () => {
      try {
        // 1️⃣ traer DB
        const res = await fetch("http://localhost:5000/api/unit/get-units");
        const units = await res.json();

        console.log("Units DB:", units);

        // 2️⃣ crear lookup ULTRA rápido
        const existingCodes = new Set(
          units.map((u: any) => u.description)
        );

        // 3️⃣ filtrar faltantes
        const missingRooms = roomsData.filter(
          room => !existingCodes.has(room.code)
        );

        console.log("Faltan:", missingRooms.length);

        // 4️⃣ crear SOLO faltantes
        for (const room of missingRooms) {

          const response = await fetch(
            "http://localhost:5000/api/unit/create-unit",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: room.type,
                description: room.code,
                capacity: room.capacity,
                state: "Disponible",
                price: 100,
              }),
            }
          );

          if (response.ok) {
            console.log(`✅ Creada ${room.code}`);
          } else if (response.status === 409) {
            console.log(`⚠️ Ya existía ${room.code}`);
          } else {
            console.error(await response.text());
          }
        }

        console.log("Sync terminado 🚀");

      } catch (err) {
        console.error("Sync error:", err);
      }
    })();
  }, []);

  return null;
};