import cors from 'cors'

const ACCEPTED_ORIGINS = [
    '*'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            if (!origin || acceptedOrigins.includes('*') || acceptedOrigins.includes(origin)) {
                return callback(null, true)
            }
            return callback(new Error(`Origin not allowed ${origin}`))
        }
    })

}