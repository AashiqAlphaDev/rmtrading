import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {appSaga} from "./app/saga"
import {uiSaga} from "./ui/saga"

import {authReducer} from './auth/reducers'
import {authSaga} from './auth/sagas'

import uiReducer from './ui/reducer'


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(combineReducers({
	auth: authReducer,
	ui: uiReducer
}), enhancer);

sagaMiddleware.run(appSaga);
sagaMiddleware.run(uiSaga);
sagaMiddleware.run(authSaga);

export default store;
