import {call, put} from 'redux-saga/effects'
import { SET_LOGGED, SET_ALL_WORKERS, SET_ONE_WORKER, SET_ALL_MANAGERS } from '../actions/types';
import { postApi, routePostApi } from '../apiCommunication/index';


export function* login(action) {
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

export function* getAllWorkers() {
    try {
        var data = yield call(
            routePostApi,
            'table=workers&action=all'
        )
        console.log(data)
        yield put ({
            type: SET_ALL_WORKERS,
            payload: data
        })
    } catch (e) {
        //console.log(e)
    }
}

export function* getOneWorker(action) {
    try {
        var data = yield call(
            routePostApi,
            'table=workers&action=getOne?id='+action.payload
        )
        console.log(data)
        yield put ({
            type: SET_ONE_WORKER,
            payload: data
        })
    } catch (e) {
        console.log(e)
    }
}

export function* getAllManagers() {
    try {
        var data = yield call(
            routePostApi,
            'table=manager&action=getWorkers'
        )
        console.log(data)
        yield put({
            type: SET_ALL_MANAGERS,
            payload: data
        })
    } catch (e) {
        console.log(e)
    }
}