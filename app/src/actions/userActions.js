import {SET_LOGGED, LOGIN} from './types'

export function login (dispatch) {
    return function( payload) {
        dispatch({
            type: LOGIN,
            payload: payload
        })
    }
}