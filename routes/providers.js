import { Router } from 'express'
import { Providers } from '../utils/providers.js'

export const providerRouter = Router()

const PROVIDERS_BASE_URL = process.env.PROVIDERS_BASE_URL || 'http://localhost:3000/providers'

class providerController {

    static async getProviders(req, res) {
        const providers = Providers
        return res.json(providers)
    }

    static async getProvider(req, res) {
        const { provider } = req.params

        if (!Object.hasOwn(Providers.providers, provider)) {

            return res.status(404).json({
                error: 'Provider not found',
                message: `Provider "${provider}" not found`
            })
        }

        return res.json({
            provider,
            logo_url: `${PROVIDERS_BASE_URL}/${provider}.svg`
        })
    }
}

providerRouter.get('/', providerController.getProviders)
providerRouter.get('/:provider', providerController.getProvider)