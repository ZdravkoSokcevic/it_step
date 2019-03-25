import {LOGIN, GET_ALL_WORKERS} from './types'

export function login (dispatch) {
    return function( payload) {
        dispatch({
            type: LOGIN,
            payload: payload
        })
    }
}

export function getAllWorkers (dispatch) {
    return function () {
        dispatch ({
            type: GET_ALL_WORKERS
        })
    }
}