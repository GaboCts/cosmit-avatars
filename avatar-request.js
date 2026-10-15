import { getTwitchAvatar } from './providers/twitch/twitch.js'
import { getGitHubAvatar } from './providers/github/github.js'
import { getGitLabAvatar } from './providers/gitlab/gitlab.js'
import { getDockerHubAvatar } from './providers/dockerhub/dockerhub.js'
import { getStackOverflowAvatar } from './providers/stackoverflow/stackoverflow.js'
import { getGravatar } from './providers/gravatar/gravatar.js'
import { downloadAndResize, generateErrorImage } from './utils/image.js'

export async function handleAvatarRequest(url) {
    const cleanUrl = url.split('?')[0]
    const segments = cleanUrl.split('/').filter(s => s !== '')

    if (segments.length < 3 || segments[0] !== 'avatar') {
        return {
            status: 400,
            body: {
                error: 'Invalid format',
                message: 'The URL must follow the format: /avatar/{provider}/{user/id/email}',
                example: '/avatar/twitch/xcosmo_'
            }
        }
    }

    const profilePrivider = segments[1].toLowerCase()
    const input = segments[2]

    const requestTime = new Date()
    console.log(`[${requestTime.toLocaleString()}]: ${segments[0]} / ${segments[1]} / ${segments[2]}`)

    let response

    switch (profilePrivider) {
        case 'twitch':
            response = await getTwitchAvatar(input)
            break

        case 'github':
            response = await getGitHubAvatar(input)
            break

        case 'gitlab':
            response = await getGitLabAvatar(input)
            break

        case 'dockerhub':
            response = await getDockerHubAvatar(input)
            break

        case 'stackoverflow':
            response = await getStackOverflowAvatar(input)
            break

        case 'gravatar':
            response = await getGravatar(input)
            break

        default:
            return {
                status: 400,
                body: {
                    error: 'Provider not supported',
                    message: `Provider "${profilePrivider}" is not available.`,
                    providersSupported: ['twitch', 'github', 'gitlab', 'dockerhub', 'stackoverflow', 'gravatar']
                }
            }
    }

    if (response.error) {
        const errorImage = await generateErrorImage('Error', response.message)
        return {
            status: response.status || 404,
            body: {
                image: errorImage.buffer,
                contentType: errorImage.contentType
            }
        }
    }

    try {
        const { buffer, contentType } = await downloadAndResize(response.avatar_url)
        return {
            status: 200,
            body: {
                image: buffer,
                contentType: contentType
            }
        }
    } catch (error) {
        return {
            status: 502,
            body: {
                error: 'Error processing image',
                message: error.message
            }
        }
    }
}