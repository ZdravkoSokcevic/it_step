import {GET_LOGGED, GET_ALL_WORKERS, GET_ONE_WORKER, GET_ALL_MANAGERS} from './types'

export function login (dispatch) {
    return function( payload) {
        dispatch({
            type: GET_LOGGED,
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

export function getOneWorker (dispatch) {
    return function (payload) {
        dispatch ({
            type: GET_ONE_WORKER,
            payload: payload
        })
    }
}

export function getAllManagers (dispatch) {
    return function () {
        dispatch ({
            type: GET_ALL_MANAGERS,
        })
    }
}