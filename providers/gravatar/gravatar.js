import { createHash } from 'node:crypto'
import { makeRequest } from '../../utils/request.js'

export async function getGravatar(email) {
    const normalizedEmail = email.trim().toLowerCase()

    const hash = createHash("sha256")
        .update(normalizedEmail)
        .digest("hex")

    try {
        const responseBody = await makeRequest(
            `https://api.gravatar.com/v3/profiles/${encodeURIComponent(hash)}`,
            'GET',
            null,
            {
                'User-Agent': 'cosmith-avatar-app'
            }
        )

        const data = JSON.parse(responseBody)

        if (data.error === 'Profile not found' || !data.avatar_url) {
            return {
                error: 'Email not found',
                message: `Email "${email}" not found`,
                status: 404
            }
        }

        return {
            avatar_url: data.avatar_url
        }
    } catch (error) {
        return {
            error: 'Error fetching Gravatar',
            message: error.message,
            status: 502
        }
    }
}