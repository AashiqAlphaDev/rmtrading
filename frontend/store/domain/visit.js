import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const visitEvents = {

    ADD_VISIT_STARTED:"visits/events/ADD_VISIT_STARTED",
    ADD_VISIT_FAILED:"visits/events/ADD_VISIT_FAILED",
	ADD_VISIT_SUCCEEDED:"visits/events/ADD_VISIT_SUCCEEDED"



};

const visitDocActions = {
};

const visitCommands = {
	ADD_VISIT:"visits/command/ADD_VISIT"
};

const initData = {
    visits:{}
};

let visitReducer = function(state=initData, {type, payload}){
	switch (type) {
	    default:{
			break;
		}
	}
	return state;
};


let visitSaga = function*() {



    yield takeEvery(visitCommands.ADD_VISIT, function*(action) {
        console.log(action)
        yield put({type: visitEvents.ADD_VISIT_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/pets/${action.payload.data.pet}/visits`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: visitEvents.ADD_VISIT_FAILED,
                postSuccessAction: visitEvents.ADD_VISIT_SUCCEEDED
            }
        });
    });




}

export {
    visitEvents,
    visitDocActions,
    visitCommands,
    visitReducer,
    visitSaga
}
