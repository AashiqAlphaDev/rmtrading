import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {authReducer,authSaga} from "./domain/auth";
import {appSaga} from "./app/saga";
import {authUiReducer, authUiSaga} from "../pages/auth";
import {petsUiReducer, petsUiSaga} from "../pages/dashboard/pets/redux";
import {dashboardUiSaga} from "../pages/dashboard";
import {userReducer, userSaga} from "./domain/user";
import {petReducer, petSaga} from "./domain/pet";


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default (initialState)=>{
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
	let store = createStore(combineReducers({
		ui:combineReducers({
			auth:authUiReducer,
			pets:petsUiReducer
		}),
		auth:authReducer,
		user:userReducer,
		pet:petReducer
	}), initialState, enhancer);
	sagaMiddleware.run(authSaga);
    sagaMiddleware.run(userSaga);
    sagaMiddleware.run(petSaga);

	sagaMiddleware.run(appSaga);
	sagaMiddleware.run(authUiSaga);
    sagaMiddleware.run(petsUiSaga);

	return store;



};



