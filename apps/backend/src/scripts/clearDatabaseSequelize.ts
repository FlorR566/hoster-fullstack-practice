import { db } from "../config/db";

/**
 * Script alternativo para borrar datos usando Sequelize
 * Más compatible con diferentes bases de datos
 * 
 * Uso: npx ts-node src/scripts/clearDatabaseSequelize.ts
 */

async function clearDatabase() {
  try {
    console.log("🗑️  Iniciando limpieza de base de datos...");
    
    // Obtener todos los modelos registrados
    const models = Object.values(db.models);
    
    if (models.length === 0) {
      console.warn("⚠️  No se encontraron modelos");
      process.exit(1);
    }
    
    // Destruir registros de cada modelo (respeta relaciones)
    for (const model of models) {
      const count = await model.destroy({ where: {}, truncate: true });
      console.log(`✓ '${model.tableName}' - ${count} registros eliminados`);
    }
    
    console.log("✅ Base de datos limpiada exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al limpiar la base de datos:", error);
    process.exit(1);
  } finally {
    await db.close();
  }
}

clearDatabase();
