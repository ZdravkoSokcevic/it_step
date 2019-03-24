import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import { SET_LOGGED, LOGIN } from '../actions/types';
import { postApi } from '../apiCommunication/index';


function* login(action) {
    console.log('usao u sagu')

    function thenFunction (json) {
        console.log(json)
        put({
            type: SET_LOGGED,
            payload: {name: 'pera', email: 'peric'}
        })
    }

    function catchFunction () {
        console.log('usao u catch fun')
    }

    try {
        const user = yield call(
            postApi,
            'login.php',
            action.payload
        )
        yield put ({
            type: SET_LOGGED,
            payload: {name: 'pera', email: 'peric'}
        })
    } catch (e) {
        console.log('kurac')
    }
    

    // postApi(
    //     'login.php',
    //     action.payload,
    //     yield put(json => {
    //         type: SET_LOGGED,
    //         payload: json
    //     }),
    //     catchFunction
    // )
}

function* mySaga() {
    yield takeEvery(LOGIN, login);
}

export default mySaga;