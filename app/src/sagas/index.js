import {takeEvery} from 'redux-saga/effects'
import {GET_LOGGED, GET_ALL_WORKERS, GET_ONE_WORKER, GET_ALL_MANAGERS} from '../actions/types';
import {login, getAllWorkers, getOneWorker, getAllManagers} from './userSaga';
import {} from './requestSaga';


function* mySaga() {
    yield takeEvery(GET_LOGGED, login);
    yield takeEvery(GET_ALL_WORKERS, getAllWorkers);
    yield takeEvery(GET_ONE_WORKER, getOneWorker);
    yield takeEvery(GET_ALL_MANAGERS, getAllManagers)
}

export default mySaga;