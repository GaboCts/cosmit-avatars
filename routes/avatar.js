import { Router } from 'express'
import { avatarModel } from '../models/avatar.js'
import { Providers } from '../utils/providers.js'

export const avatarRouter = Router()

class avatarController {
    static async getAvatar(req, res) {
        const { provider, input } = req.params

        try {
            const avatar = await avatarModel.getAvatar({ provider, input })
            res.statusCode = avatar.status
    
            if (avatar.body.image) {
                res.setHeader('Content-Type', avatar.body.contentType)
                res.setHeader('Cache-Control', 'public, max-age=3600')
                res.end(avatar.body.image)
            } else {
                res.setHeader('Content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify(avatar.body))
            }
        } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({
                error: 'Internal Server Error',
                message: error.message
            }))
        }
    }

    static async getProviders(req, res) {
        const providers = Providers

        return res.json(providers)
    }
}

avatarRouter.get('/providers', avatarController.getProviders)
avatarRouter.get('/:provider/:input', avatarController.getAvatar)