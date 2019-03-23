import {combineReducers} from 'redux';

import user from './userReducer';
import requestReducer from './requestReducer'

export default combineReducers({
    user: user,
    request: requestReducer
})