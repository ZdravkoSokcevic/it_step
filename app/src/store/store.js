import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const initialState = {}

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga);

export default store;