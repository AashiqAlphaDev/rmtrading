import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const appointmentEvents = {
    
    FETCH_AVAILABLE_APPOINTMENTS_STARTED:"appointments/events/FETCH_AVAILABLE_APPOINTMENTS_STARTED",
    FETCH_AVAILABLE_APPOINTMENTS_FAILED:"appointments/events/FETCH_AVAILABLE_APPOINTMENTS_FAILED",
    FETCH_AVAILABLE_APPOINTMENTS_SUCCEEDED:"appointments/events/FETCH_AVAILABLE_APPOINTMENTS_SUCCEEDED",

    BOOK_APPOINTMENT_STARTED:"appointments/events/BOOK_APPOINTMENT_STARTED",
    BOOK_APPOINTMENT_FAILED:"appointments/events/BOOK_APPOINTMENT_FAILED",
    BOOK_APPOINTMENT_SUCCEEDED:"appointments/events/BOOK_APPOINTMENT_SUCCEEDED"

};

const appointmentDocActions = {

    SET_SLOTS:"appointments/command/SET_SLOTS"

};

const appointmentCommands = {
	UPDATE_AVAILABLE_APPOINTMENTS:"appointments/command/UPDATE_AVAILABLE_APPOINTMENTS",
	DELETE_AVAILABLE_APPOINTMENTS_QUEUE:"appointments/command/DELETE_AVAILABLE_APPOINTMENTS_QUEUE",
	ADD_AVAILABLE_APPOINTMENTS_QUEUE:"appointments/command/ADD_AVAILABLE_APPOINTMENTS_QUEUE",
    ADD_AVAILABLE_APPOINTMENTS_QUEUE_SLOT:"appointments/command/ADD_AVAILABLE_APPOINTMENTS_QUEUE_SLOT",
    DELETE_AVAILABLE_APPOINTMENTS_QUEUE_SLOT:"appointments/command/DELETE_AVAILABLE_APPOINTMENTS_QUEUE_SLOT",
    FETCH_AVAILABLE_APPOINTMENTS:"appointments/command/FETCH_AVAILABLE_APPOINTMENTS",
    BOOK_APPOINTMENT:"appointments/command/BOOK_APPOINTMENT"

};

const initData = {

};

let appointmentReducer = function(state=initData, {type, payload}){
	switch (type) {
        case appointmentDocActions.SET_SLOTS: {
            state = {...state, [payload.center_id]:{[payload.date]:payload.slots}}
            break;
        }
	    default:{
			break;
		}
	}
	return state;
};


let appointmentSaga = function*() {


    yield takeEvery(appointmentCommands.FETCH_AVAILABLE_APPOINTMENTS, function* (action) {
        yield put({type:appointmentEvents.FETCH_AVAILABLE_APPOINTMENTS_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.vaccination_center_id}/appointments/available?date=${action.payload.date}`,
                method: httpMethods.GET
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: appointmentEvents.FETCH_AVAILABLE_APPOINTMENTS_FAILED,
                postSuccessAction: appointmentEvents.FETCH_AVAILABLE_APPOINTMENTS_SUCCEEDED,
                onSuccess:function*(payload){
                    yield put({type:appointmentDocActions.SET_SLOTS, payload:{center_id:action.payload.vaccination_center_id ,date:action.payload.date,slots:payload}});
                }
            }
        });
    });


    yield takeEvery(appointmentCommands.BOOK_APPOINTMENT, function* (action) {
        yield put({type:appointmentEvents.BOOK_APPOINTMENT_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccination-centers/${action.payload.center_id}/appointments?date=${action.payload.date}`,
                method: httpMethods.POST,
                body:action.payload.data
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: appointmentEvents.BOOK_APPOINTMENT_FAILED,
                postSuccessAction: appointmentEvents.BOOK_APPOINTMENT_SUCCEEDED,
            }
        });
    });

}




export {
    appointmentEvents,
    appointmentDocActions,
    appointmentCommands,
    appointmentReducer,
    appointmentSaga
}
