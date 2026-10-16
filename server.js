import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { avatarRouter } from './routes/avatar.js'
import { formatRouter } from './routes/format.js'

process.loadEnvFile()

const PORT = process.env.PORT || 3000
const app = express()

app.use(corsMiddleware())

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src *")
    next()
})

app.use("/avatar", avatarRouter)

app.use(formatRouter)

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Active avatar server in http://localhost:${PORT}`)
})

export default app