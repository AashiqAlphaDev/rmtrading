import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../app/saga";

const userEvents = {
    ADD_GUARDIAN_STARTED: "guardian/events/ADD_GUARDIAN_STARTED",
    ADD_GUARDIAN_SUCCEEDED: "guardian/events/ADD_GUARDIAN_SUCCEEDED",
    ADD_GUARDIAN_FAILED: "guardian/events/ADD_GUARDIAN_FAILED",

    FETCH_GUARDIAN_STARTED:"guardian/events/FETCH_GUARDIAN_STARTED",
    FETCH_GUARDIAN_FAILED:"guardian/events/FETCH_GUARDIAN_FAILED",
    FETCH_GUARDIAN_SUCCEEDED:"guardian/events/FETCH_GUARDIAN_SUCCEEDED",


    FETCH_GUARDIANS_STARTED:"guardian/events/FETCH_GUARDIANS_STARTED",
    FETCH_GUARDIANS_FAILED:"guardian/events/FETCH_GUARDIANS_FAILED",
    FETCH_GUARDIANS_SUCCEEDED:"guardian/events/FETCH_GUARDIANS_SUCCEEDED",

};

const userDocActions = {
    SET_USERS:"guardian/command/SET_USERS"
};

const userCommands = {
    ADD_GUARDIAN: "guardian/command/ADD_GUARDIAN",
    FETCH_GUARDIAN:"guardian/command/FETCH_GUARDIAN",
};

const initData = {
    users:{}
};

let userReducer = function(state=initData, {type, payload}){
	switch (type) {
        case userDocActions.SET_USERS:{
            payload.forEach((user)=>{
                state = {...state, users:{...state.users, [user._id]:user}}
            });
            break;
        }
	    default:{
			break;
		}
	}
	return state;
};


let userSaga = function*() {
    yield takeEvery(userCommands.ADD_GUARDIAN, function* (action) {
        console.log(action)
        yield put({type:userEvents.ADD_GUARDIAN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/users`,
                method: httpMethods.POST,
				body:action.payload.data,
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: userEvents.ADD_GUARDIAN_FAILED,
                postSuccessAction: userEvents.ADD_GUARDIAN_SUCCEEDED
            }
        });
    });
    yield takeEvery(userCommands.FETCH_GUARDIAN, function* (action) {
        yield put({type:userEvents.FETCH_GUARDIAN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `/users`,
                method: httpMethods.GET
            },
            meta: {
                callbackId:action.payload.callbackId,
                postFailureAction: userEvents.FETCH_GUARDIAN_FAILED,
                postSuccessAction: userEvents.FETCH_GUARDIAN_SUCCEEDED,
                onSuccess:function*(payload){
                    yield put({type:userDocActions.SET_USERS, payload:payload.data});
                }
            }
        });
    });






};







export {
    userEvents,
    userDocActions,
    userCommands,
    userReducer,
    userSaga
}
