import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const vaccinationCenterEvents = {

    UPDATE_VACCINATION_CENTER_STARTED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_STARTED",
    UPDATE_VACCINATION_CENTER_FAILED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_FAILED",
    UPDATE_VACCINATION_CENTER_SUCCEEDED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_SUCCEEDED",
};

const vaccinationCenterDocActions = {
};

const vaccinationCenterCommands = {
	UPDATE_VACCINATION_CENTER:"vaccinationCenters/command/UPDATE_VACCINATION_CENTER",

};

const initData = {
    vaccinationCenters:{}
};

let vaccinationCenterReducer = function(state=initData, {type, payload}){
	switch (type) {
	    default:{
			break;
		}
	}
	return state;
};


let vaccinationCenterSaga = function*() {



    yield takeEvery(vaccinationCenterCommands.UPDATE_VACCINATION_CENTER, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/:vaccination_center_id`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_FAILED,
                postSuccessAction: vaccinationCenterEvents.UPDATE_VACCINATION_CENTER_SUCCEEDED
            }
        });
    });




}


export {
    vaccinationCenterEvents,
    vaccinationCenterDocActions,
    vaccinationCenterCommands,
    vaccinationCenterReducer,
    vaccinationCenterSaga
}
