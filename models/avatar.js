import { getDockerHubAvatar } from "../providers/dockerhub/dockerhub.js"
import { getGitHubAvatar } from "../providers/github/github.js"
import { getGitLabAvatar } from "../providers/gitlab/gitlab.js"
import { getGravatar } from "../providers/gravatar/gravatar.js"
import { getStackOverflowAvatar } from "../providers/stackoverflow/stackoverflow.js"
import { getTwitchAvatar } from "../providers/twitch/twitch.js"
import { downloadAndResize, generateErrorImage } from "../utils/image.js"
import { Providers } from "../utils/providers.js"

let response

export class avatarModel {

    static async getAvatar({ provider, input }) {
        switch (provider) {
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
                        message: `Provider "${provider}" is not available.`,
                        Providers
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
}