import { makeRequest } from '../../utils/request.js'

export async function getStackOverflowAvatar(id) {
    try {
        const responseBody = await makeRequest(
            `https://api.stackexchange.com/2.3/users/${encodeURIComponent(id)}?site=stackoverflow`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app'
            }
        )

        const data = JSON.parse(responseBody)

        if (!data.items[0].profile_image) {
            return {
                error: 'User not found',
                message: `User "${id}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data.items[0].profile_image
        }
    } catch (error) {
        return {
            error: 'Error fetching Stack Overflow',
            message: error.message,
            status: 502
        }
    }
}