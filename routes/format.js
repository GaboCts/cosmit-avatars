import { Router } from 'express'

export const formatRouter = Router()

class FormatController {
    static async avatarFormat(req, res) {
        return res.status(404).json({
            error: 'Format error',
            body: {
                error: 'Invalid format',
                avatars: {
                    message: 'Must follow the format: /avatar/{provider}/{user/id/email}',
                    example: '/avatar/twitch/xcosmo_'
                },
                providerList: {
                    message: 'Must follow the format: /avatar/providers',
                    example: '/avatar/providers'
                }
            }
        })
    }
}

formatRouter.use(FormatController.avatarFormat)