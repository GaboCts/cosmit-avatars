import { createServer } from 'node:http'
import { handleAvatarRequest } from './avatar-request.js'

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        const result = await handleAvatarRequest(req.url)
        res.statusCode = result.status
        res.end(JSON.stringify(result.body))
    } catch (error) {
        res.statusCode = 500
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message
        }))
    }
})

server.listen(PORT, () => {
    console.log(`Active avatar server in http://localhost:${PORT}`)
})