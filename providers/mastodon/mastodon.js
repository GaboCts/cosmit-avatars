import { makeRequest } from '../../utils/request.js'

export async function getMastodonAvatar(user) {
    try {
        const responseBody = await makeRequest(
            `https://mastodon.social/api/v1/accounts/lookup?acct=${encodeURIComponent(user)}`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app'
            }
        )

        const data = JSON.parse(responseBody)

        if (data.message === 'Record not found' || !data.avatar) {
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
            error: 'Error fetching Mastodon',
            message: error.message,
            status: 502
        }
    }
}