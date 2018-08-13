import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";
import _ from "underscore"

const tokenEvents = {
    GENERATE_TOKENS_STARTED:"tokens/events/GENERATE_TOKENS_STARTED",
    GENERATE_TOKENS_FAILED:"tokens/events/GENERATE_TOKENS_FAILED",
    GENERATE_TOKENS_SUCCEEDED:"tokens/events/GENERATE_TOKENS_SUCCEEDED",
    UPDATE_TOKEN_STARTED:"tokens/events/UPDATE_TOKEN_STARTED",
    UPDATE_TOKEN_FAILED:"tokens/events/UPDATE_TOKEN_FAILED",
    UPDATE_TOKEN_SUCCEEDED:"tokens/events/UPDATE_TOKEN_SUCCEEDED",
    FETCH_TOKEN_STARTED:"tokens/events/FETCH_TOKEN_STARTED",
    FETCH_TOKEN_FAILED:"tokens/events/FETCH_TOKEN_FAILED",
    FETCH_TOKEN_SUCCEEDED:"tokens/events/FETCH_TOKEN_SUCCEEDED"
};

const tokenDocActions = {
};

const tokenCommands = {
	GENERATE_TOKENS:"tokens/command/GENERATE_TOKENS",
	UPDATE_TOKEN:"tokens/command/UPDATE_TOKEN",
	FETCH_TOKEN:"tokens/command/FETCH_TOKEN",
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







    yield takeEvery(tokenCommands.UPDATE_TOKEN, function*(action) {
        yield put({type: tokenEvents.UPDATE_TOKEN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/tokens/${action.payload.token_id}`,
                method: httpMethods.PUT,
                body: action.payload.body,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: tokenEvents.UPDATE_TOKEN_FAILED,
                postSuccessAction: tokenEvents.UPDATE_TOKEN_SUCCEEDED
            }
        });
    });


    yield takeEvery(tokenCommands.FETCH_TOKEN, function*(action) {
        yield put({type: tokenEvents.FETCH_TOKEN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/tokens/${action.payload.token_id}`,
                method: httpMethods.GET,
            },
            meta: {
                callbackId: action.payload.callbackId,
                postFailureAction: tokenEvents.FETCH_TOKEN_FAILED,
                postSuccessAction: tokenEvents.FETCH_TOKEN_SUCCEEDED
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
