import {call, put, takeEvery} from 'redux-saga/effects'
import { SET_LOGGED, LOGIN, SET_ALL_WORKERS, GET_ALL_WORKERS } from '../actions/types';
import { postApi, routeGetApi } from '../apiCommunication/index';


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

function* getAllWorkers() {
    try {
        var data = yield call(
            routeGetApi,
            '?table=workers&action=all'
        )
        console.log(data)
        yield put ({
            type: SET_ALL_WORKERS,
            payload: data
        })
    } catch (e) {
        console.log(e)
    }
}

function* mySaga() {
    yield takeEvery(LOGIN, login);
    yield takeEvery(GET_ALL_WORKERS, getAllWorkers);
}

export default mySaga;