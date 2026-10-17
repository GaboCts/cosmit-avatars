import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'url'
import { dirname } from 'node:path'
import { makeRequest } from '../../utils/request.js'

process.loadEnvFile()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID || 'none'
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET || 'none'
const TOKEN_CACHE_FILE = path.join(__dirname, '.twitch-token-cache.json')

let cachedToken = null
let tokenExpiration = null

export async function getTwitchAvatar(channel) {
    try {
        if (TWITCH_CLIENT_ID === 'none' || TWITCH_CLIENT_SECRET === 'none') {
            return {
                error: 'Credential error',
                message: 'Contact the administrator to fix the problem.',
                status: 500
            }
        }

        const token = await getAccessToken()

        const responseBody = await makeRequest(
            `https://api.twitch.tv/helix/users?login=${encodeURIComponent(channel)}`,
            'GET',
            null,
            {
                'Client-ID': TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${token}`
            }
        )

        const data = JSON.parse(responseBody)

        if (!data.data || data.data.length === 0) {
            return {
                error: 'User not found',
                message: `User "${channel}" not found`,
                status: 404
            }
        }

        const profileImageUrl = data.data[0].profile_image_url

        return {
            avatar_url: profileImageUrl
        }
    } catch (error) {
        return {
            error: 'Error fetching Twitch',
            message: error.message,
            status: 502
        }
    }
}

async function getAccessToken() {
    loadTokenFromFile()

    if (cachedToken && Date.now() < tokenExpiration) {
        return cachedToken
    }

    const params = new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
    })

    const tokenResponse = await makeRequest(
        'https://id.twitch.tv/oauth2/token',
        'POST',
        params.toString(),
        {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    )

    const data = JSON.parse(tokenResponse)
    cachedToken = data.access_token
    tokenExpiration = new Date(Date.now() + (data.expires_in - 60) * 1000)

    saveTokenToFile(cachedToken, tokenExpiration)

    return cachedToken
}

function loadTokenFromFile() {
    try {
        if (!fs.existsSync(TOKEN_CACHE_FILE)) {
            return
        }

        const fileContent = fs.readFileSync(TOKEN_CACHE_FILE, 'utf-8')
        const tokenData = JSON.parse(fileContent)

        const expiresAt = new Date(tokenData.expires_at)

        if (tokenData.token && expiresAt && new Date() < expiresAt) {
            cachedToken = tokenData.token
            tokenExpiration = expiresAt
        }
    } catch (error) {
        console.warn('[Twitch] Error loading Token:', error.message)
    }
}

function saveTokenToFile(token, expiresAt) {
    try {
        const tokenData = {
            token: token,
            expires_at: expiresAt.toISOString()
        }

        fs.writeFileSync(TOKEN_CACHE_FILE, JSON.stringify(tokenData, null, 2), 'utf-8')
        console.log('[Twitch] Token saved:', expiresAt.toLocaleString())
    } catch (error) {
        console.warn('[Twitch] Token error:', error.message)
    }
}