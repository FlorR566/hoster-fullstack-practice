import colors from 'colors'
import server from './server'
import {db} from './config/db'

const port = process.env.PORT || 5000

async function startServer() {
  try {
    server.listen(port, () => {
      console.log(colors.cyan.bold(`REST API en el puerto ${port}`));
    });
    await db.authenticate();
    await db.sync({ alter: true });
  } catch (error) {
    console.error(error);
    console.log(colors.red.bold("Fallo la conexión con la BD"));
    process.exit(1);
  }
}

startServer();