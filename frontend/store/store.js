import adminData from "./super-admin/reducer"
import authData from "./auth/reducer"
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {authSaga} from "./auth/actions";
import {adminSaga} from "./super-admin/auth-actions";
import {diseaseListSaga} from "./super-admin/app-data-actions";

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;



const authSagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
	applyMiddleware(authSagaMiddleware),
);


export default (initState)=>{
	const store = createStore(combineReducers({authData, adminData}), initState, enhancer);
	authSagaMiddleware.run(authSaga);
	authSagaMiddleware.run(adminSaga);
	authSagaMiddleware.run(diseaseListSaga);
	return store;
}





