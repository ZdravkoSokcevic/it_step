import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import { SET_LOGGED, LOGIN } from '../actions/types';
import { postApi } from '../apiCommunication/index';


function* login(action) {
    try {
        var data = yield call(
            postApi,
            'login.php',
            action.payload
        )
        console.log(data)
        yield put ({
            type: SET_LOGGED,
            payload: data
        })
    } catch (e) {
        console.log(e)
    }
}

function* mySaga() {
    yield takeEvery(LOGIN, login);
}

export default mySaga;