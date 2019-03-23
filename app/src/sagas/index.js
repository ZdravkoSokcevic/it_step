import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import callApi from '../apiCommunication'
import { SET_LOGGED, LOGIN } from '../actions/types';


function* login(action) {
    console.log('saga')
    function* thenFunction (json) {
        yield put({
            type: SET_LOGGED,
            payload: json
        })
    }
    yield callApi(
        'login.php',
        'post',
        action.payload,
        thenFunction
    )
}

function* mySaga() {
    yield takeEvery(LOGIN, login);
}

export default mySaga;