import {createStore, applyMiddleware, combineReducers,compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import authReducer from './auth/reducers'
import authSaga from './auth/sagas'

import vetCenterReducer from './vet-centers/reducers'
import vetCenterSaga from './vet-centers/sagas'

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;



// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
	applyMiddleware(sagaMiddleware)
	// other store enhancers if any
);

// mount it on the Store
const store = createStore(
	combineReducers({auth:authReducer, vetCenters:vetCenterReducer}),
	enhancer
)

// then run the saga
sagaMiddleware.run(authSaga)
sagaMiddleware.run(vetCenterSaga)

export default store;
