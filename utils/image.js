import sharp from 'sharp'

export async function downloadAndResize(imageUrl) {
    const response = await fetch(imageUrl)

    if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const resizedBuffer = await sharp(buffer)
        .resize(
            300,
            300,
            {
                fit: 'cover'
            })
        .toBuffer()

    return {
        buffer: resizedBuffer,
        contentType
    }
}

export async function generateErrorImage(title, subtitle) {
    const svgBuffer = Buffer.from(`
        <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#1a1a2e"/>
            <text x="150" y="130" text-anchor="middle" fill="#e94560" font-family="Arial" font-size="36" font-weight="bold">${title}</text>
            <text x="150" y="160" text-anchor="middle" fill="#a0a0a0" font-family="Arial" font-size="18">${subtitle}</text>
            <text x="150" y="260" text-anchor="middle" fill="#555" font-family="Arial" font-size="22">cosmith-avatars</text>
        </svg>
    `)

    const resizedBuffer = await sharp(svgBuffer)
        .resize(
            300,
            300,
            {
                fit: 'cover'
            })
        .png()
        .toBuffer()

    return { buffer: resizedBuffer, contentType: 'image/png' }
}
