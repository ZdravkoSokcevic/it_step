import {SET_LOGGED, SET_ALL_WORKERS, SET_ONE_WORKER, SET_ALL_MANAGERS} from '../actions/types'

const initialState = {
    loggedUser: {},
    allWorkers: [],
    oneWorker: {},
    allManagers: []
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
        case SET_ONE_WORKER: {
            return {
                ...state,
                oneWorker: action.payload
            }
        }
        case SET_ALL_MANAGERS: {
            return {
                ...state,
                allManagers: action.payload
            }
        }
    }
}