import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const tokenEvents = {
    GENERATE_TOKENS_STARTED:"tokens/events/GENERATE_TOKENS_STARTED",
    GENERATE_TOKENS_FAILED:"tokens/events/GENERATE_TOKENS_FAILED",
    GENERATE_TOKENS_SUCCEEDED:"tokens/events/GENERATE_TOKENS_SUCCEEDED"
};

const tokenDocActions = {
};

const tokenCommands = {
	GENERATE_TOKENS:"tokens/command/GENERATE_TOKENS",
};

const initData = {
    tokens:{}
};

let tokenReducer = function(state=initData, {type, payload}){
	switch (type) {
	    default:{
			break;
		}
	}
	return state;
};


let tokenSaga = function*() {



    yield takeEvery(tokenCommands.GENERATE_TOKENS, function*(action) {
        yield put({type: tokenEvents.GENERATE_TOKENS_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/tokens/generate`,
                method: httpMethods.POST,
                body: {count: action.payload.count},
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: tokenEvents.GENERATE_TOKENS_FAILED,
                postSuccessAction: tokenEvents.GENERATE_TOKENS_SUCCEEDED
            }
        });
    });


}





export {
    tokenEvents,
    tokenDocActions,
    tokenCommands,
    tokenReducer,
    tokenSaga
}
