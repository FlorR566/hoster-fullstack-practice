import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import currencyRouter from './routes/currencyRouter'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexion existosa con la BD'))
    } catch (error) {
        console.log(colors.red.bold('Fallo la Conexion con la BD'))
        console.log(error)

    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/currency', currencyRouter)


export default app