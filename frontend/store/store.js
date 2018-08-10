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
import {vaccinationCenterReducer, vaccinationCenterSaga} from "./domain/vaccination-center";
import {userAuthUiReducer, userAuthUiSaga} from "../pages/user-dashboard/index";
import {appointmentReducer, appointmentSaga} from "./domain/appointments";
import {homeUiReducer, homeUiSaga} from "../pages/redux";
import {superAdminAuthUiReducer, superAdminAuthUiSaga} from "../pages/super-admin-dashboard/index";
import {
    vaccinationCentersUiReducer,
    vaccinationCentersUiSaga
} from "../pages/super-admin-dashboard/vaccination-centers/redux";
import {vaccineReducer, vaccineSaga} from "./domain/vaccines";
import {vaccinesUiReducer, vaccinesUiSaga} from "../pages/super-admin-dashboard/vaccines/redux";
import {petTypeReducer, petTypeSaga} from "./domain/pet-types";
import {petTypesUiReducer, petTypesUiSaga} from "../pages/super-admin-dashboard/app-data/pet-type/redux";
import {claimReducer, claimSaga} from "./domain/claim";
import {claimsUiReducer, claimsUiSaga} from "../pages/super-admin-dashboard/vaccination-centers/options/redux";
import {tokensUiReducer, tokensUiSaga} from "../pages/super-admin-dashboard/app-data/generate-tokens/redux";
import {tokenReducer, tokenSaga} from "./domain/token";


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default (initialState)=>{
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
	let store = createStore(combineReducers({
		ui:combineReducers({
			auth:authUiReducer,
			userAuth:userAuthUiReducer,
			superAdminAuth:superAdminAuthUiReducer,
			pets:petsUiReducer,
            appointments:appointmentsUiReducer,
            homeCenters:homeUiReducer,
			vaccinationCenter:vaccinationCentersUiReducer,
			vaccine:vaccinesUiReducer,
			petTypes:petTypesUiReducer,
			claim:claimsUiReducer,
			token:tokensUiReducer
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
	sagaMiddleware.run(claimsUiSaga);
	sagaMiddleware.run(tokensUiSaga);
	sagaMiddleware.run(tokenSaga);
	sagaMiddleware.run(petTypesUiSaga);
	sagaMiddleware.run(vaccineSaga);
	sagaMiddleware.run(petTypeSaga);
	sagaMiddleware.run(userAuthUiSaga);
	sagaMiddleware.run(superAdminAuthUiSaga);
    sagaMiddleware.run(userSaga);
    sagaMiddleware.run(petSaga);
    sagaMiddleware.run(visitSaga);
    sagaMiddleware.run(appointmentSaga);
    sagaMiddleware.run(vaccinationSaga);
    sagaMiddleware.run(vaccinationCenterSaga);
	sagaMiddleware.run(appSaga);
	sagaMiddleware.run(authUiSaga);
    sagaMiddleware.run(petsUiSaga);
    sagaMiddleware.run(vaccinesUiSaga);
    sagaMiddleware.run(vaccinationCentersUiSaga);
    sagaMiddleware.run(appointmentsUiSaga);
    sagaMiddleware.run(homeUiSaga);
	return store;



};



