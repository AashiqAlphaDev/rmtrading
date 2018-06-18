import {createStore, applyMiddleware, combineReducers,compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import authReducer from './auth/reducers'
import authSaga from './auth/sagas'

import {vetCenterReducer,vetCenterDetailReducer} from './vet-centers/reducers'
import vetCenterSaga from './vet-centers/sagas'

import {vaccineReducer,vaccineDetailReducer} from './vaccines/reducers'
import vaccinesSaga from './vaccines/sagas'

import countriesReducer from './countries/reducers'
import countriesSaga from './countries/sagas'

import petTypesReducer from './pet-types/reducers'
import petTypesSaga from './pet-types/sagas'

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(combineReducers({
	auth:authReducer,
	vetCenters:vetCenterReducer,
	vaccines:vaccineReducer,
	countries:countriesReducer,
	vetCenterDetail:vetCenterDetailReducer,
	vaccineDetail:vaccineDetailReducer,
	petTypes:petTypesReducer
}), enhancer)

sagaMiddleware.run(authSaga);
sagaMiddleware.run(vetCenterSaga);
sagaMiddleware.run(countriesSaga);
sagaMiddleware.run(petTypesSaga);
sagaMiddleware.run(vaccinesSaga);

export default store;
