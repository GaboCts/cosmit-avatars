import https from 'https'

export function makeRequest(url, method, body, headers = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url)

        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || 443,
            path: urlObj.pathname + urlObj.search,
            method: method,
            headers: headers
        }

        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body)
        }

        const req = https.request(options, (res) => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk
            })

            res.on('end', () => {
                resolve(data)
            })
        })

        req.on('error', (error) => {
            reject(error)
        })

        if (body) {
            req.write(body)
        }

        req.end()
    })
}