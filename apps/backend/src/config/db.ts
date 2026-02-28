// import { Sequelize } from 'sequelize-typescript'
// import dotenv from 'dotenv'
// dotenv.config()

// export const db = new Sequelize(process.env.DATABASE_URL, {
//     models: [__dirname + '/../models/**/*'],
//     logging: false
// })

import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL missing");

export const db = new Sequelize(dbUrl, {
  models: [__dirname + "/../models/**/*"],
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});