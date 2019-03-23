export default function* apiCall(url, method, body, thenFunction, catchFunction) {
    const baseUrl = 'http://localhost:8000/controller/';
    console.log('fetch')
    return yield fetch (
        baseUrl+url, {
            method: method,
            body: JSON.stringify(body)
        }
    )
    .then(res => {
        return res.json()
    })
    .then(thenFunction)
    .then(catchFunction)
}