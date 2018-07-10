import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../../app/saga";

let petCommands = {
	FETCH_PET: "pet/command/FETCH_PET",


};

let petEvents = {
	FETCH_PET_STARTED: "pet/events/FETCH_PET_STARTED",
	FETCH_PET_SUCCEEDED: "pet/events/FETCH_PET_SUCCEEDED",
	FETCH_PET_FAILED: "pet/events/FETCH_PET_FAILED",

}

let petSaga = function* () {

	yield takeEvery(petCommands.FETCH_PET, function* (action) {
		yield put({type:petEvents.FETCH_PET_STARTED});

		let url="";
        if (action.payload.pet_id) {
            url = '/pets/' + action.payload.pet_id;
        }
        if (action.payload.token) {
            url = '/pets/token/' + action.payload.token;
        }
		yield put({
			type: appActions.API,
			payload: {
				url: url,
				method: httpMethods.GET
			},
			meta: {
				postFailureAction: petEvents.FETCH_PET_FAILED,
				postSuccessAction: petEvents.FETCH_PET_SUCCEEDED
			}
		});
	});




}

export {petSaga, petCommands, petEvents};
