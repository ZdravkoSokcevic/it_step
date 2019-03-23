import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import callApi from '../apiCommunication'
import { SET_LOGGED, LOGIN } from '../actions/types';


function* login(action) {
    console.log('saga')
    const thenFunction = json => {
        console.log(json)
        put({
            type: SET_LOGGED,
            payload: json
        })
    }
    yield callApi(
        'login.php',
        'post',
        action.payload,
        function (json) {
            console.log('json')
            console.log(json)
        }
    )
}

function* mySaga() {
    yield takeEvery(LOGIN, login);
}

export default mySaga;