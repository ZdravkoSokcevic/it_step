export function postApi (url, body) {
    const baseUrl = 'http://localhost:8000/controller/';
    fetch (baseUrl+url, {
        method: 'post',
        body: JSON.stringify(body)
    })
    .then(res => {
        return res.json()
    })
    .then(json => {
        return json
    })
}

export function getApi (url, thenFunction, catchFunction) {
    const baseUrl = 'http://localhost:8000/controller/';
    fetch(baseUrl+url, {
        method: 'get'
    })
    .then(function(res) {
        return res.json()
    })
    .then(thenFunction)
    .then(catchFunction)
}