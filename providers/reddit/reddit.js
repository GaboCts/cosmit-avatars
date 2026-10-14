import { makeRequest } from '../../utils/request.js'

export async function getRedditAvatar(user) {
    try {
        const responseBody = await makeRequest(
            `https://www.reddit.com/user/${encodeURIComponent(user)}/about.json`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app (by /u/GaboCts)'
            }
        )
        
        const data = JSON.parse(responseBody)

        if (data.data.message === 'Not Found' || !data.data.icon_img) {
            return {
                error: 'User not found',
                message: `User "${user}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data.icon_img.split('?')[0]
        }
    } catch (error) {
        return {
            error: 'Error fetching Reddit',
            message: error.message,
            status: 502
        }
    }
}