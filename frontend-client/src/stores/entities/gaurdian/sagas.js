import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../../app/saga";

let guardianCommands = {
    FETCH_GUARDIAN: "guardian/command/FETCH_GUARDIAN",


};

let guardianEvents = {
    FETCH_GUARDIAN_STARTED: "guardian/events/FETCH_GUARDIAN_STARTED",
    FETCH_GUARDIAN_SUCCEEDED: "guardian/events/FETCH_GUARDIAN_SUCCEEDED",
    FETCH_GUARDIAN_FAILED: "guardian/events/FETCH_GUARDIAN_FAILED",

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


}

export {guardianSaga, guardianCommands, guardianEvents};
