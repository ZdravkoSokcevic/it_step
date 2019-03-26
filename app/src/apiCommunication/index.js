export async function postApi (url, body) {
    const baseUrl = 'http://localhost:8000/controller/';
    const response = await fetch (baseUrl+url, {
        method: 'post',
        body: JSON.stringify(body)
    })
    return await response.json()
}

export async function routePostApi (url, body) {
    const baseUrl = 'http://localhost:8000/controller/routing.php?';
    const response = await fetch (baseUrl + url, {
        method: 'post',
        body: JSON.stringify(body)
    })
    return await response.json()
}

export async function getApi (url) {
    const baseUrl = 'http://localhost:8000/controller/';
    const response = await fetch(baseUrl+url, {
        method: 'get'
    })
    return await response.json()
}

export async function routeGetApi (url) {
    const baseUrl = 'http://localhost:8000/controller/routing.php?';
    const response = await fetch(baseUrl+url, {
        method: 'get'
    })
    return await response.json()
}