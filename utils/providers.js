const PROVIDERS_BASE_URL = process.env.PROVIDERS_BASE_URL || 'http://localhost:3000/providers'

export const Providers  = {
    providers: {
        bluesky: {
            provider: 'BlueSky',
            logo_url: `${PROVIDERS_BASE_URL}/bluesky.svg`,
            input_type: 'username'
        },dockerhub: {
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
        mastodon: {
            provider: 'Mastodon',
            logo_url: `${PROVIDERS_BASE_URL}/mastodon.svg`,
            input_type: 'username'
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
        },
        xbox: {
            provider: 'Xbox',
            logo_url: `${PROVIDERS_BASE_URL}/xbox.svg`,
            input_type: 'gamertag'
        }
    }
}