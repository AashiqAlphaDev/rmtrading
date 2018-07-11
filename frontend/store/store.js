import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {authReducer,authSaga} from "./domain/auth";
import {appSaga} from "./app/saga";

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default (initialState)=>{
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
	let store = createStore(combineReducers({
		session:(state={}, {type, payload})=>{
			switch (type){
				case "SET_SESSION":{
					state = {...state, ...payload};
				}
			}
			return state;
		},
		auth:authReducer
	}), initialState, enhancer);
	sagaMiddleware.run(authSaga);
	sagaMiddleware.run(appSaga);
	return store;
};





