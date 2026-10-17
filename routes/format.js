import { Router } from 'express'

export const formatRouter = Router()

class FormatController {
    static async avatarFormat(req, res) {
        return res.status(404).json({
            error: 'Invalid format',
            avatars: {
                message: 'Must follow the format: /avatar/{provider}/{user/id/email}',
                example: '/avatar/twitch/xcosmo_'
            },
            providers: {
                message: 'Must follow the format: /providers/{provider}',
                examples: {
                    providerList: '/providers',
                    provider: '/providers/twitch'
                }
            }
        })
    }
}

formatRouter.use(FormatController.avatarFormat)