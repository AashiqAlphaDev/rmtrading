import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const claimEvents = {

    ADD_CLAIM_STARTED:"claims/events/ADD_CLAIM_STARTED",
    ADD_CLAIM_FAILED:"claims/events/ADD_CLAIM_FAILED",
	ADD_CLAIM_SUCCEEDED:"claims/events/ADD_CLAIM_SUCCEEDED",
    DELETE_CLAIM_STARTED:"claims/events/DELETE_CLAIM_STARTED",
    DELETE_CLAIM_FAILED:"claims/events/DELETE_CLAIM_FAILED",
    DELETE_CLAIM_SUCCEEDED:"claims/events/DELETE_CLAIM_SUCCEEDED"



};

const claimDocActions = {
};

const claimCommands = {
	ADD_CLAIM:"claims/command/ADD_CLAIM",
	DELETE_CLAIM:"claims/command/DELETE_CLAIM"

    

};

const initData = {
    claims:{}
};

let claimReducer = function(state=initData, {type, payload}){
	switch (type) {
	    default:{
			break;
		}
	}
	return state;
};


let claimSaga = function*() {



    yield takeEvery(claimCommands.ADD_CLAIM, function*(action) {
        console.log(action)
        yield put({type: claimEvents.ADD_CLAIM_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/claims`,
                method: httpMethods.POST,
                body: action.payload.data,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: claimEvents.ADD_CLAIM_FAILED,
                postSuccessAction: claimEvents.ADD_CLAIM_SUCCEEDED
            }
        });
    });

    yield takeEvery(claimCommands.DELETE_CLAIM, function*(action) {
        console.log(action)
        yield put({type: claimEvents.DELETE_CLAIM_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/claims/${action.payload.claimId}`,
                method: httpMethods.DELETE,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: claimEvents.DELETE_CLAIM_FAILED,
                postSuccessAction: claimEvents.DELETE_CLAIM_SUCCEEDED
            }
        });
    });




}





export {
    claimEvents,
    claimDocActions,
    claimCommands,
    claimReducer,
    claimSaga
}
