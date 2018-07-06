import {takeEvery,put} from "redux-saga/effects";
import {authCommands, authEvents} from "../../../../stores/entities/auth/sagas";
import {loginUiDocActions} from "./reducer"
const actions = {
	LOGIN_PAGE_WILL_LOAD:"login/ui/events/LOGIN_PAGE_WILL_LOAD"
};




let saga = function *() {

	yield takeEvery(actions.LOGIN_PAGE_WILL_LOAD, function*() {
        yield put({type:authCommands.CHECK_ADMIN});
    });

	yield takeEvery(authEvents.CHECK_ADMIN_PASSED, function*(){
        yield put({type:loginUiDocActions.SET_REDIRECT, payload:"/admin/auth/dashboard"})
	});

	yield takeEvery(authEvents.LOGIN_SUCCEEDED, function*() {
		yield put({type:loginUiDocActions.SET_REDIRECT, payload:"/admin/dashboard"})
    });
}

export {
	actions as loginUiEvents,
	saga as loginUiSaga
}