import {combineReducers} from 'redux';

import userReducer from './userReducer';
import requestReducer from './requestReducer'

export default combineReducers({
    user: userReducer,
    request: requestReducer
})