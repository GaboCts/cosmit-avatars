import { makeRequest } from '../../utils/request.js'

export async function getDockerHubAvatar(user) {
    try {
        const responseBody = await makeRequest(
            `https://hub.docker.com/v2/users/${encodeURIComponent(user)}/`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app'
            }
        )

        const data = JSON.parse(responseBody)

        if (data.message === 'User not Found' || !data.gravatar_url) {
            return {
                error: 'User not found',
                message: `User "${user}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data.gravatar_url
        }
    } catch (error) {
        return {
            error: 'Error fetching Docker Hub',
            message: error.message,
            status: 502
        }
    }
}