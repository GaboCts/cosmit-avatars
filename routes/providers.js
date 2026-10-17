import { Router } from 'express'
import { Providers } from '../utils/providers.js'

export const providerRouter = Router()

const PROVIDERS_BASE_URL = process.env.PROVIDERS_BASE_URL || 'http://localhost:3000/providers'

class providerController {

    static async getProviders(req, res) {
        const providers = Providers
        const requestTime = new Date()
        console.log(`[${requestTime.toLocaleString()}]: Providers requested`)
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

        const requestTime = new Date()
        console.log(`[${requestTime.toLocaleString()}]: Provider: ${ provider }`)

        return res.json({
            [provider]: {
                provider: Providers.providers[provider].provider,
                logo_url: `${PROVIDERS_BASE_URL}/${provider}.svg`,
                input_type: Providers.providers[provider].input_type
            }
        })
    }
}

providerRouter.get('/', providerController.getProviders)
providerRouter.get('/:provider', providerController.getProvider)