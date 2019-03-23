export default function* apiCall(url, method, body, thenFunction) {
    const baseUrl = 'http://localhost:8000/controller/';
    console.log('fetch')
    yield fetch (
        baseUrl+url, {
            method: method,
            body: JSON.stringify(body)
        }
    )
    .then(function(res) {
        return res.json()
    })
    .then(thenFunction)
    .catch(console.log('catch'))
}