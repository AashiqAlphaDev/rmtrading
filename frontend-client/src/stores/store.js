import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {uiReducer} from "./ui/reducer";
import {attachUiMiddlewares} from "./ui/saga";
import {authSaga} from "./entities/auth/sagas";
import {authReducer} from "./entities/auth/reducers";
import {appSaga} from "./app/saga";
import {vetCenterSaga} from "./entities/vet-centers/sagas";
import {vetCenterReducer} from "./entities/vet-centers/reducers";


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(combineReducers({
	ui:uiReducer,
	entities:{
		auth:authReducer,
		vaccination_center:vetCenterReducer
	}
}), enhancer);

attachUiMiddlewares(sagaMiddleware);
sagaMiddleware.run(authSaga);
sagaMiddleware.run(appSaga);
sagaMiddleware.run(vetCenterSaga);

export default store;







