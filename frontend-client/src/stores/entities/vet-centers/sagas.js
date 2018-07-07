import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../../app/saga";
import {authDocActions} from "./reducers"

let vetCenterCommands = {
	FETCH_VET_CENTER: "vetCenter/command/FETCH_VET_CENTER",

};

let vetCenterEvents = {

	FETCH_VET_CENTER_STARTED: "vetCenter/events/FETCH_VET_CENTER_STARTED",
	FETCH_VET_CENTER_SUCCEEDED: "vetCenter/events/FETCH_VET_CENTER_SUCCEEDED",
	FETCH_VET_CENTER_FAILED: "vetCenter/events/FETCH_VET_CENTER_FAILED",
}

let vetCenterSaga = function* () {

	yield takeEvery(vetCenterCommands.LOGIN, function* (action) {
		yield put({type:vetCenterEvents.FETCH_VET_CENTER_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: '/login',
				method: httpMethods.POST,
				body: action.payload
			},
			meta: {
				postFailureAction: vetCenterEvents.FETCH_VET_CENTER_FAILED,
				postSuccessAction: vetCenterEvents.FETCH_VET_CENTER_SUCCEEDED
			}
		});
	});


}

export {vetCenterSaga, vetCenterCommands, vetCenterEvents};
