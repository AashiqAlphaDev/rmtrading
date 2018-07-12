import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {authReducer,authSaga} from "./domain/auth";
import {appSaga} from "./app/saga";
import {authUiReducer, authUiSaga} from "../pages/auth";
import {dashboardUiSaga} from "../pages/dashboard";

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default (initialState)=>{
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
	let store = createStore(combineReducers({
		ui:combineReducers({
			auth:authUiReducer
		}),
		auth:authReducer
	}), initialState, enhancer);
	sagaMiddleware.run(authSaga);
	sagaMiddleware.run(appSaga);
	sagaMiddleware.run(authUiSaga);
	sagaMiddleware.run(dashboardUiSaga);
	return store;
};





