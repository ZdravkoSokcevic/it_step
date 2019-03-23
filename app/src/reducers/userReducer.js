import {SET_LOGGED} from '../actions/types'

const initialState = {
    loggedUser: {}
}

export default function userReducer (state = initialState, action) {
    switch(action.type) {
        default: return state;
        case SET_LOGGED: return {
            ...state,
            loggedUser: action.payload
        }
    }
}