import {rateLimit} from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 3,
    message: {"error": "Has alcanzado el límite de peticiones"}
})