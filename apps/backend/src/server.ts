import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import { allowedUrls } from './config/url'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import currencyRouter from './routes/currencyRouter'
import job from './config/cron'

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
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedUrls.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}))

job.start()

app.use('/api/auth', authRouter)

app.use('/api/currency', currencyRouter)


export default app