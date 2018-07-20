import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {authReducer,authSaga} from "./domain/auth";
import {appSaga} from "./app/saga";
import {authUiReducer, authUiSaga} from "../pages/auth";
import {petsUiReducer, petsUiSaga} from "../pages/dashboard/pets/redux";
import {dashboardUiSaga} from "../pages/dashboard";
import {userReducer, userSaga} from "./domain/user";
import {petReducer, petSaga} from "./domain/pet";
import {visitReducer, visitSaga} from "./domain/visit";
import {vaccinationReducer, vaccinationSaga} from "./domain/vaccination";
import {appointmentsUiReducer, appointmentsUiSaga} from "../pages/dashboard/appointments/redux";
import {vaccinationCenterReducer, vaccinationCenterSaga} from "./domain/appointment";
import {userAuthUiReducer, userAuthUiSaga} from "../pages/user-dashboard/index";


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default (initialState)=>{
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
	let store = createStore(combineReducers({
		ui:combineReducers({
			auth:authUiReducer,
			userAuth:userAuthUiReducer,
			pets:petsUiReducer,
            appointments:appointmentsUiReducer
		}),
		auth:authReducer,
		user:userReducer,
		pet:petReducer,
		visit:visitReducer,
		vaccination:vaccinationReducer,
		vaccinationCenter:vaccinationCenterReducer,
	}), initialState, enhancer);
	sagaMiddleware.run(authSaga);
	sagaMiddleware.run(userAuthUiSaga);
    sagaMiddleware.run(userSaga);
    sagaMiddleware.run(petSaga);
    sagaMiddleware.run(visitSaga);
    sagaMiddleware.run(vaccinationSaga);
    sagaMiddleware.run(vaccinationCenterSaga);
	sagaMiddleware.run(appSaga);
	sagaMiddleware.run(authUiSaga);
    sagaMiddleware.run(petsUiSaga);
    sagaMiddleware.run(appointmentsUiSaga);





	return store;



};



