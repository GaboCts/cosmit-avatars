const PROVIDERS_BASE_URL = process.env.PROVIDERS_BASE_URL || 'http://localhost:3000/providers'

export const Providers  = {
    providers: {
        dockerhub: {
            provider: 'Docker Hub',
            logo_url: `${PROVIDERS_BASE_URL}/dockerhub.svg`
        },
        github: {
            provider: 'GitHub',
            logo_url: `${PROVIDERS_BASE_URL}/github.svg`
        },
        gitlab: {
            provider: 'GitLab',
            logo_url: `${PROVIDERS_BASE_URL}/gitlab.svg`
        },
        gravatar: {
            provider: 'Gravatar',
            logo_url: `${PROVIDERS_BASE_URL}/gravatar.svg`
        },
        reddit: {
            provider: 'Reddit',
            logo_url: `${PROVIDERS_BASE_URL}/reddit.svg`
        },
        stackoverflow: {
            provider: 'Stack Overflow',
            logo_url: `${PROVIDERS_BASE_URL}/stackoverflow.svg`
        },
        twitch: {
            provider: 'Twitch',
            logo_url: `${PROVIDERS_BASE_URL}/twitch.svg`
        }
    }
}