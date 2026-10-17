import { makeRequest } from '../../utils/request.js'

const VIMEO_API_KEY = process.env.VIMEO_API_KEY || 'none'

export async function getVimeoAvatar(user_id) {
    try {
        if (VIMEO_API_KEY === 'none') {
            return {
                error: 'Credential error',
                message: 'Contact the administrator to fix the problem.',
                status: 500
            }
        }

        const responseBody = await makeRequest(
            `https://api.vimeo.com/users/${encodeURIComponent(user_id)}`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app',
                'Authorization': `bearer ${ VIMEO_API_KEY }`
            }
        )

        const data = JSON.parse(responseBody)

        if (data.error === `The requested user couldn't be found.` || !data.pictures.base_link) {
            return {
                error: 'User not found',
                message: `User "${user_id}" not found`,
                status: 404
            }
        }

        const avatar_url = data.pictures.base_link.split('?')[0]

        return {
            avatar_url: avatar_url
        }
    } catch (error) {
        return {
            error: 'Error fetching Vimeo',
            message: error.message,
            status: 502
        }
    }
}