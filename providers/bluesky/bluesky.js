import { makeRequest } from '../../utils/request.js'

export async function getBlueSkyAvatar(user) {
    try {
        const responseBody = await makeRequest(
            `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(user)}`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app'
            }
        )

        const data = JSON.parse(responseBody)

        if (data.message === 'Profile not found' || !data.avatar) {
            return {
                error: 'User not found',
                message: `User "${user}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data.avatar
        }
    } catch (error) {
        return {
            error: 'Error fetching BlueSky',
            message: error.message,
            status: 502
        }
    }
}