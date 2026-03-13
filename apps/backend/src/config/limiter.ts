import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 300,
    message: { "error": "Has alcanzado el límite de peticiones" }
})