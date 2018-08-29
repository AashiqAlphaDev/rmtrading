import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {authReducer,authSaga} from "./domain/auth";
import {appSaga} from "./app/saga";
import {vaccinationCenterReducer, vaccinationCenterSaga} from "./domain/vaccination-center";
import {userReducer, userSaga} from "./domain/user";
import {petReducer, petSaga} from "./domain/pet";
import {visitReducer, visitSaga} from "./domain/visit";
import {vaccinationReducer, vaccinationSaga} from "./domain/vaccination";
import {appointmentReducer, appointmentSaga} from "./domain/appointments";
import {homeUiReducer, homeUiSaga} from "../pages/redux";
import {vaccineReducer, vaccineSaga} from "./domain/vaccines";
import {petTypeReducer, petTypeSaga} from "./domain/pet-types";
import {claimReducer, claimSaga} from "./domain/claim";
import {tokenReducer, tokenSaga} from "./domain/token";


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default (initialState)=>{
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
	let store = createStore(combineReducers({
		ui:combineReducers({
            home:homeUiReducer,
		}),
		auth:authReducer,
		claim:claimReducer,
		vaccines:vaccineReducer,
		user:userReducer,
		pet:petReducer,
		visit:visitReducer,
		vaccination:vaccinationReducer,
		vaccinationCenter:vaccinationCenterReducer,
		appointments:appointmentReducer,
		petTypes:petTypeReducer,
		token:tokenReducer



	}), initialState, enhancer);
	sagaMiddleware.run(authSaga);
	sagaMiddleware.run(claimSaga);


	sagaMiddleware.run(tokenSaga);

	sagaMiddleware.run(vaccineSaga);
	sagaMiddleware.run(petTypeSaga);


    sagaMiddleware.run(userSaga);
    sagaMiddleware.run(petSaga);
    sagaMiddleware.run(visitSaga);
    sagaMiddleware.run(appointmentSaga);
    sagaMiddleware.run(vaccinationSaga);
    sagaMiddleware.run(vaccinationCenterSaga);
	sagaMiddleware.run(appSaga);

    sagaMiddleware.run(homeUiSaga);
	return store;



};



