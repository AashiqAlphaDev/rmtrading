import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../../app/saga";

let guardianCommands = {
    FETCH_GUARDIAN: "guardian/command/FETCH_GUARDIAN",

    ADD_GUARDIAN: "guardian/command/ADD_GUARDIAN",
};

let guardianEvents = {
    FETCH_GUARDIAN_STARTED: "guardian/events/FETCH_GUARDIAN_STARTED",
    FETCH_GUARDIAN_SUCCEEDED: "guardian/events/FETCH_GUARDIAN_SUCCEEDED",
    FETCH_GUARDIAN_FAILED: "guardian/events/FETCH_GUARDIAN_FAILED",

    ADD_GUARDIAN_STARTED: "guardian/events/ADD_GUARDIAN_STARTED",
    ADD_GUARDIAN_SUCCEEDED: "guardian/events/ADD_GUARDIAN_SUCCEEDED",
    ADD_GUARDIAN_FAILED: "guardian/events/ADD_GUARDIAN_FAILED"

}

let guardianSaga = function* () {

    yield takeEvery(guardianCommands.FETCH_GUARDIAN, function* (action) {
        yield put({type:guardianEvents.FETCH_GUARDIAN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `users/by-mobile-or-gov-id/${action.payload.query}`,
                method: httpMethods.GET
            },
            meta: {
                postFailureAction: guardianEvents.FETCH_GUARDIAN_FAILED,
                postSuccessAction: guardianEvents.FETCH_GUARDIAN_SUCCEEDED
            }
        });
    });


    yield takeEvery(guardianCommands.ADD_GUARDIAN, function* (action) {
        yield put({type:guardianEvents.ADD_GUARDIAN_STARTED});
        yield put({
            type: appActions.API,
            payload: {
                url: `users`,
                method: httpMethods.POST
            },
            meta: {
                postFailureAction: guardianEvents.ADD_GUARDIAN_FAILED,
                postSuccessAction: guardianEvents.ADD_GUARDIAN_SUCCEEDED
            }
        });
    });



}

export {guardianSaga, guardianCommands, guardianEvents};
