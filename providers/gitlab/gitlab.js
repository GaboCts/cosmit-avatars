import { makeRequest } from '../../utils/request.js'

export async function getGitLabAvatar(user) {
    try {
        const responseBody = await makeRequest(
            `https://gitlab.com/api/v4/users?username=${encodeURIComponent(user)}`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app'
            }
        )

        const data = JSON.parse(responseBody)
        console.log(data.length)

        if (data.length  === 0) {
            return {
                error: 'User not found',
                message: `User "${user}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data[0].avatar_url
        }
    } catch (error) {
        return {
            error: 'Error fetching GitLab',
            message: error.message,
            status: 502
        }
    }
}