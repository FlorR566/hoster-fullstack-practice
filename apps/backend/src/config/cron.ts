import { CronJob } from "cron";

const job = new CronJob(
    "0 */12 * * * *",
    async function () {
        console.log("⏰ Awake Server!");

        if (process.env.PROD_API_URL) {
            try {
                await fetch(`${process.env.PROD_API_URL}/`);
                console.log("✅ Ping enviado correctamente");
            } catch (error) {
                console.error("❌ Error al hacer ping:", error);
            }
        }
    },
    null,
    true
);

export default job;