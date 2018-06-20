import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

import authReducer from './auth/reducers'
import authSaga from './auth/sagas'

import {vetCenterReducer, vetCenterDetailReducer} from './vet-centers/reducers'
import vetCenterSaga from './vet-centers/sagas'

import {vaccineReducer, vaccineDetailReducer} from './vaccines/reducers'
import vaccinesSaga from './vaccines/sagas'


import {petsReducer, guardianDetailReducer} from './pets/reducers'
import petsSaga from './pets/sagas'

import diseaseReducer from './diseases/reducers'
import diseasesSaga from './diseases/sagas'

import countriesReducer from './countries/reducers'
import countriesSaga from './countries/sagas'

import petTypesReducer from './pet-types/reducers'
import petTypesSaga from './pet-types/sagas'

import userReducer from './users/reducers'
import userSaga from './users/sagas'

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(combineReducers({
	auth: authReducer,
	countries: countriesReducer,
	petTypes: petTypesReducer,
	diseases: diseaseReducer,
	vetCenters: vetCenterReducer,
	vaccines: vaccineReducer,
	vetCenterDetail: vetCenterDetailReducer,
	vaccineDetail: vaccineDetailReducer,
	pets: petsReducer,
	guardianDetail: guardianDetailReducer,
	users: userReducer
}), enhancer)

sagaMiddleware.run(authSaga);
sagaMiddleware.run(vetCenterSaga);
sagaMiddleware.run(countriesSaga);
sagaMiddleware.run(petTypesSaga);
sagaMiddleware.run(vaccinesSaga);
sagaMiddleware.run(diseasesSaga);
sagaMiddleware.run(petsSaga);
sagaMiddleware.run(userSaga);


export default store;
