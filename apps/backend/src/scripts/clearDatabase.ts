import { db } from "../config/db";

/**
 * Script para borrar todos los datos de la base de datos
 * Mantiene las tablas pero elimina todos los registros
 * 
 * Uso: npx ts-node src/scripts/clearDatabase.ts
 */

async function clearDatabase() {
  try {
    console.log("🗑️  Iniciando limpieza de base de datos...");
    
    // Desactivar restricciones de clave foránea temporalmente
    await db.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
    
    // Obtener todas las tablas
    const tables = await db.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = DATABASE() AND table_name != 'SequelizeMeta'`,
      { raw: true }
    );
    
    // Truncar cada tabla
    for (const table of tables as any[]) {
      const tableName = table.table_name;
      await db.query(`TRUNCATE TABLE ${tableName}`, { raw: true });
      console.log(`✓ Tabla '${tableName}' vaciada`);
    }
    
    // Reactivar restricciones de clave foránea
    await db.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
    
    console.log("✅ Base de datos limpiada exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al limpiar la base de datos:", error);
    process.exit(1);
  }
}

clearDatabase();
