import { createServer } from 'node:http'
import { handleAvatarRequest } from './avatar-request.js'

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        const result = await handleAvatarRequest(req.url)
        res.statusCode = result.status

        if (result.body.image) {
            res.setHeader('Content-Type', result.body.contentType)
            res.setHeader('Cache-Control', 'public, max-age=3600')
            res.end(result.body.image)
        } else {
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(result.body))
        }
    } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message
        }))
    }
})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Active avatar server in http://localhost:${PORT}`)
})