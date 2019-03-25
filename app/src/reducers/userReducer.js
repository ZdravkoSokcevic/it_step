import {SET_LOGGED, SET_ALL_WORKERS} from '../actions/types'

const initialState = {
    loggedUser: {},
    allWorkers: []
}

export default function user (state = initialState, action) {
    switch(action.type) {
        default: return state;
        case SET_LOGGED: {
            return {
            ...state,
            loggedUser: action.payload
            }
        }
        case SET_ALL_WORKERS: {
            return {
                ...state, 
                allWorkers: action.payload
            }
        }
    }
}