const PROVIDERS_BASE_URL = process.env.PROVIDERS_BASE_URL || 'http://localhost:3000/providers'

export const Providers  = {
    providers: {
        dockerhub: {
            provider: 'Docker Hub',
            logo_url: `${PROVIDERS_BASE_URL}/dockerhub.svg`,
            input_type: 'username'
        },
        github: {
            provider: 'GitHub',
            logo_url: `${PROVIDERS_BASE_URL}/github.svg`,
            input_type: 'username'
        },
        gitlab: {
            provider: 'GitLab',
            logo_url: `${PROVIDERS_BASE_URL}/gitlab.svg`,
            input_type: 'username'
        },
        gravatar: {
            provider: 'Gravatar',
            logo_url: `${PROVIDERS_BASE_URL}/gravatar.svg`,
            input_type: 'email'
        },
        // reddit: {
        //     provider: 'Reddit',
        //     logo_url: `${PROVIDERS_BASE_URL}/reddit.svg`,
        //     input_type: 'username'
        // },
        stackoverflow: {
            provider: 'Stack Overflow',
            logo_url: `${PROVIDERS_BASE_URL}/stackoverflow.svg`,
            input_type: 'user_id'
        },
        twitch: {
            provider: 'Twitch',
            logo_url: `${PROVIDERS_BASE_URL}/twitch.svg`,
            input_type: 'channel'
        }
    }
}