import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const vaccineEvents = {

    ADD_VACCINE_STARTED:"vaccines/events/ADD_VACCINE_STARTED",
    ADD_VACCINE_FAILED:"vaccines/events/ADD_VACCINE_FAILED",
	ADD_VACCINE_SUCCEEDED:"vaccines/events/ADD_VACCINE_SUCCEEDED",

    DELETE_VACCINE_STARTED:"vaccines/events/DELETE_VACCINE_STARTED",
    DELETE_VACCINE_FAILED:"vaccines/events/DELETE_VACCINE_FAILED",
    DELETE_VACCINE_SUCCEEDED:"vaccines/events/DELETE_VACCINE_SUCCEEDED",

    DELETE_VACCINE_SCHEDULE_STARTED:"vaccines/events/DELETE_VACCINE_SCHEDULE_STARTED",
    DELETE_VACCINE_SCHEDULE_FAILED:"vaccines/events/DELETE_VACCINE_SCHEDULE_FAILED",
    DELETE_VACCINE_SCHEDULE_SUCCEEDED:"vaccines/events/DELETE_VACCINE_SCHEDULE_SUCCEEDED",

    ADD_VACCINE_SCHEDULE_STARTED:"vaccines/events/ADD_VACCINE_SCHEDULE_STARTED",
    ADD_VACCINE_SCHEDULE_FAILED:"vaccines/events/ADD_VACCINE_SCHEDULE_FAILED",
    ADD_VACCINE_SCHEDULE_SUCCEEDED:"vaccines/events/ADD_VACCINE_SCHEDULE_SUCCEEDED"
};

const vaccineDocActions = {
};

const vaccineCommands = {
	ADD_VACCINE:"vaccines/command/ADD_VACCINE",
    DELETE_VACCINE:"vaccines/command/DELETE_VACCINE",
    DELETE_VACCINE_SCHEDULE:"vaccines/command/DELETE_VACCINE_SCHEDULE",
    ADD_VACCINE_SCHEDULE:"vaccines/command/ADD_VACCINE_SCHEDULE"

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



    yield takeEvery(vaccineCommands.DELETE_VACCINE, function*(action) {
        console.log(action)
        yield put({type: vaccineEvents.DELETE_VACCINE_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccines/${action.payload.data}`,
                method: httpMethods.DELETE,

            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccineEvents.DELETE_VACCINE_FAILED,
                postSuccessAction: vaccineEvents.DELETE_VACCINE_SUCCEEDED
            }
        });
    });


    yield takeEvery(vaccineCommands.DELETE_VACCINE_SCHEDULE, function*(action) {
        yield put({type: vaccineEvents.DELETE_VACCINE_SCHEDULE_STARTED});
        var body = {}
        if(action.payload.dosageType == "child_vaccine_schedules")
        {body={$pull: {child_vaccine_schedules: {_id: action.payload.schedule_id}}}}
        else if(action.payload.dosageType == "adult_vaccine_schedules")
        {body={$pull: {adult_vaccine_schedules: {_id: action.payload.schedule_id}}}}
        else if(action.payload.dosageType == "booster_vaccine_schedules")
        {body={$pull: {booster_vaccine_schedules: {_id: action.payload.schedule_id}}}}

        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccines/${action.payload.vaccine_id}`,
                method: httpMethods.PUT,
                body: body,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccineEvents.DELETE_VACCINE_SCHEDULE_FAILED,
                postSuccessAction: vaccineEvents.DELETE_VACCINE_SCHEDULE_SUCCEEDED
            }
        });
    });

    yield takeEvery(vaccineCommands.ADD_VACCINE_SCHEDULE, function*(action) {
        yield put({type: vaccineEvents.ADD_VACCINE_SCHEDULE_STARTED});
        var body = {}
        if(action.payload.dosageType == "child")
        {body= {$push: {child_vaccine_schedules: action.payload.schedule_data}}}
        else if(action.payload.dosageType == "adult")
        {body= {$push: {adult_vaccine_schedules: action.payload.schedule_data}}}
        else if(action.payload.dosageType == "booster")
        {body= {$push: {booster_vaccine_schedules: action.payload.schedule_data}}}

        yield put({
            type: appActions.API,
            payload: {
                url: `/vaccines/${action.payload.vaccine_id}`,
                method: httpMethods.PUT,
                body: body,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: vaccineEvents.ADD_VACCINE_SCHEDULE_FAILED,
                postSuccessAction: vaccineEvents.ADD_VACCINE_SCHEDULE_SUCCEEDED
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
