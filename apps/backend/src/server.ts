import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import paymentRouter from './routes/paymentRouter'
import reserveRouter from './routes/reserveRouter'
import serviceRouter from './routes/serviceRouter'
import currencyRouter from './routes/currencyRouter'
import guestRouter from './routes/guestRouter'
import originRouter from './routes/originRouter'

import cors from "cors";

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.blue.bold('Conexion existosa con la BD'))
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold('Fallo la Conexion con la BD'))
        
    }
}
connectDB()

const app = express()
app.use(cors()); 

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/payment', paymentRouter)

app.use('/api/reserve', reserveRouter)

app.use('/api/service', serviceRouter)

app.use('/api/currency', currencyRouter)
app.use('/api/guest', guestRouter)
app.use('/api/origin', originRouter)

export default app