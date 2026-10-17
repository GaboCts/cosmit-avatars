import { makeRequest } from '../../utils/request.js'

const XBOX_API_KEY = process.env.XBOX_API_KEY || 'none'

export async function getXboxAvatar(gamertag) {
    try {
        if (XBOX_API_KEY === 'none') {
            return {
                error: 'Credential error',
                message: 'Contact the administrator to fix the problem.',
                status: 500
            }
        }

        const responseBody = await makeRequest(
            `https://api.xbl.io/v2/search/${encodeURIComponent(gamertag)}`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app',
                'Accept': 'application/json',
                'x-authorization': `${ XBOX_API_KEY }`
            }
        )

        const data = JSON.parse(responseBody)

        if (!data.content.people[0].displayPicRaw) {
            return {
                error: 'User not found',
                message: `User "${gamertag}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data.content.people[0].displayPicRaw
        }
    } catch (error) {
        return {
            error: 'Error fetching Xbox',
            message: error.message,
            status: 502
        }
    }
}