import { makeRequest } from '../../utils/request.js'

export async function getRedditAvatar(user) {
    try {
        const responseBody = await makeRequest(
            `https://www.reddit.com/user/${encodeURIComponent(user)}/about.json`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app (by /u/GaboCts)',
                'Accept': 'application/json'
            }
        )
        
        const data = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody

        if (data?.error === 404 || !data?.data) {
            return {
                error: 'User not found',
                message: `User "${user}" not found`,
                status: 404
            }
        }

        const avatarUrl = data.data.icon_img

        if (!avatarUrl) {
            return {
                error: 'Avatar not found',
                message: `No avatar available for "${user}"`,
                status: 404
            }
        }

        return {
            avatar_url: avatarUrl.split('?')[0]
        }

    } catch (error) {
        return {
            error: 'Error fetching Reddit',
            message: error.message,
            status: 502
        }
    }
}