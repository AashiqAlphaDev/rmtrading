import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const vaccineEvents = {

    ADD_VACCINE_STARTED:"vaccines/events/ADD_VACCINE_STARTED",
    ADD_VACCINE_FAILED:"vaccines/events/ADD_VACCINE_FAILED",
	ADD_VACCINE_SUCCEEDED:"vaccines/events/ADD_VACCINE_SUCCEEDED",

    UPDATE_VACCINE_STARTED:"vaccines/events/UPDATE_VACCINE_STARTED",
    UPDATE_VACCINE_FAILED:"vaccines/events/UPDATE_VACCINE_FAILED",
    UPDATE_VACCINE_SUCCEEDED:"vaccines/events/UPDATE_VACCINE_SUCCEEDED",



};

const vaccineDocActions = {
};

const vaccineCommands = {
	ADD_VACCINE:"vaccines/command/ADD_VACCINE",
    UPDATE_VACCINE:"vaccines/command/UPDATE_VACCINE"

};

const initData = {
    vaccines:{}
};

let vaccineReducer = function(state=initData, {type, payload}){
	switch (type) {
	    default:{
			break;
		}
	}
	return state;
};


let vaccineSaga = function*() {



    yield takeEvery(vaccineCommands.ADD_VACCINE, function*(action) {
        console.log(action)
        yield put({type: vaccineEvents.ADD_VACCINE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccines`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccineEvents.ADD_VACCINE_FAILED,
                postSuccessAction: vaccineEvents.ADD_VACCINE_SUCCEEDED
            }
        });
    });



    yield takeEvery(vaccineCommands.UPDATE_VACCINE, function*(action) {
        console.log(action)
        yield put({type: vaccineEvents.UPDATE_VACCINE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccines`,
                method: httpMethods.DELETE,

            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccineEvents.UPDATE_VACCINE_FAILED,
                postSuccessAction: vaccineEvents.UPDATE_VACCINE_SUCCEEDED
            }
        });
    });




}


export {
    vaccineEvents,
    vaccineDocActions,
    vaccineCommands,
    vaccineReducer,
    vaccineSaga
}
