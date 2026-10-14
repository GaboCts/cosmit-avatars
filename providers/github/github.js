import { makeRequest } from '../../utils/request.js'

export async function getGitHubAvatar(user) {
    try {
        const responseBody = await makeRequest(
            `https://api.github.com/users/${encodeURIComponent(user)}`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app'
            }
        )

        const data = JSON.parse(responseBody)

        if (data.message === 'Not Found' || !data.avatar_url) {
            return {
                error: 'User not found',
                message: `User "${user}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data.avatar_url
        }
    } catch (error) {
        return {
            error: 'Error fetching GitHub',
            message: error.message,
            status: 502
        }
    }
}