import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {appSaga} from "./app/saga"
import {uiSaga} from "./ui/saga"

import {authReducer} from './entities/auth/reducers'
import {authSaga} from './entities/auth/sagas'

import uiReducer from './ui/reducer'
import {userReducer} from "./entities/users/reducers";
import {userSaga} from "./entities/users/sagas";

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(combineReducers({
	auth: authReducer,
	users:userReducer,
	ui: uiReducer
}), enhancer);

sagaMiddleware.run(appSaga);
sagaMiddleware.run(uiSaga);
sagaMiddleware.run(authSaga);
sagaMiddleware.run(userSaga);

export default store;
