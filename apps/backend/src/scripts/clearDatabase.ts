import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

/**
 * Script para borrar todos los datos de la base de datos
 * Versión robusta que evita errores de asociaciones
 * 
 * Uso: npx ts-node src/scripts/clearDatabase.ts
 */

async function clearDatabase() {
  let db: Sequelize | null = null;

  try {
    console.log("🗑️  Iniciando limpieza de base de datos...");

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new Error("DATABASE_URL missing");

    // Crear instancia de Sequelize SIN cargar modelos automáticamente
    db = new Sequelize(dbUrl, {
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });

    // Verificar conexión
    await db.authenticate();
    console.log("✓ Conexión a base de datos establecida");

    // Obtener todas las tablas (PostgreSQL)
    const tables: any = await db.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`,
      { raw: true }
    );

    if (!tables || !Array.isArray(tables) || (tables as any[]).length === 0) {
      console.log("⚠️  No se encontraron tablas para limpiar");
      process.exit(0);
    }

    // Truncar cada tabla (CASCADE maneja las restricciones foráneas)
    for (const table of tables as any[]) {
      const tableName = table.table_name;
      try {
        await db.query(`TRUNCATE TABLE "${tableName}" CASCADE`, { raw: true });
        console.log(`✓ Tabla '${tableName}' vaciada`);
      } catch (err) {
        console.warn(`⚠️  No se pudo vaciar '${tableName}': ${(err as Error).message}`);
      }
    }

    console.log("✅ Base de datos limpiada exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al limpiar la base de datos:", error);
    process.exit(1);
  } finally {
    if (db) {
      await db.close();
    }
  }
}

clearDatabase();
