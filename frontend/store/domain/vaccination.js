import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const vaccinationEvents = {
    UPDATE_VACCINATION_STARTED:"vaccinations/events/UPDATE_VACCINATION_STARTED",
    UPDATE_VACCINATION_FAILED:"vaccinations/events/UPDATE_VACCINATION_FAILED",
    UPDATE_VACCINATION_SUCCEEDED:"vaccinations/events/UPDATE_VACCINATION_SUCCEEDED"

};

const vaccinationDocActions = {
};

const vaccinationCommands = {
    UPDATE_VACCINATION:"vaccinations/command/UPDATE_VACCINATION"
};

const initData = {
    vaccinations:{}
};

let vaccinationReducer = function(state=initData, {type, payload}){
	switch (type) {
	    default:{
			break;
		}
	}
	return state;
};


let vaccinationSaga = function*() {

    yield takeEvery(vaccinationCommands.UPDATE_VACCINATION, function*(action) {
        console.log("inside vacc saga",action);
        yield put({type: vaccinationEvents.UPDATE_VACCINATION_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/pets/${action.payload.data.pet}/vaccinations/${action.payload.selectedVaccination._id}`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationEvents.UPDATE_VACCINATION_FAILED,
                postSuccessAction: vaccinationEvents.UPDATE_VACCINATION_SUCCEEDED
            }
        });
    });

}

export {
    vaccinationEvents,
    vaccinationDocActions,
    vaccinationCommands,
    vaccinationReducer,
    vaccinationSaga
}
