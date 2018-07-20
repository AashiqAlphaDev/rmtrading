import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const vaccinationCenterEvents = {

    UPDATE_VACCINATION_CENTER_STARTED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_STARTED",
    UPDATE_VACCINATION_CENTER_FAILED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_FAILED",
    UPDATE_VACCINATION_CENTER_SUCCEEDED:"vaccinationCenters/events/UPDATE_VACCINATION_CENTER_SUCCEEDED",

    DELETE_VACCINATION_CENTER_QUEUE_STARTED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_STARTED",
    DELETE_VACCINATION_CENTER_QUEUE_FAILED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_FAILED",
    DELETE_VACCINATION_CENTER_QUEUE_SUCCEEDED:"vaccinationCenters/events/DELETE_VACCINATION_CENTER_QUEUE_SUCCEEDED",

    ADD_VACCINATION_CENTER_QUEUE_STARTED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_STARTED",
    ADD_VACCINATION_CENTER_QUEUE_FAILED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_FAILED",
    ADD_VACCINATION_CENTER_QUEUE_SUCCEEDED:"vaccinationCenters/events/ADD_VACCINATION_CENTER_QUEUE_SUCCEEDED",


};

const vaccinationCenterDocActions = {
};

const vaccinationCenterCommands = {
	UPDATE_VACCINATION_CENTER:"vaccinationCenters/command/UPDATE_VACCINATION_CENTER",
	DELETE_VACCINATION_CENTER_QUEUE:"vaccinationCenters/command/DELETE_VACCINATION_CENTER_QUEUE",
	ADD_VACCINATION_CENTER_QUEUE:"vaccinationCenters/command/ADD_VACCINATION_CENTER_QUEUE",

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

    yield takeEvery(vaccinationCenterCommands.DELETE_VACCINATION_CENTER_QUEUE, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/:vaccination_center_id`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_FAILED,
                postSuccessAction: vaccinationCenterEvents.DELETE_VACCINATION_CENTER_QUEUE_SUCCEEDED
            }
        });
    });


    yield takeEvery(vaccinationCenterCommands.ADD_VACCINATION_CENTER_QUEUE, function*(action) {
        console.log(action)
        yield put({type: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/:vaccination_center_id`,
                method: httpMethods.PUT,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_FAILED,
                postSuccessAction: vaccinationCenterEvents.ADD_VACCINATION_CENTER_QUEUE_SUCCEEDED
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
