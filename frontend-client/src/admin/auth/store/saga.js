import {takeEvery, put} from "redux-saga/effects";
import {authCommands} from "../../../stores/entities/auth/sagas";
import {authDocActions} from "../../../stores/entities/auth/reducers";

const authUiEvents = {
	AUTH_PAGE_LOAD:"ui/auth/events/AUTH_PAGE_LOAD",
	ADMIN_DASHBOARD_PAGE_LOAD:"ui/auth/events/ADMIN_DASHBOARD_PAGE_LOAD",
};

let authUiSaga = function*() {
	yield takeEvery(authUiEvents.AUTH_PAGE_LOAD, function*() {
		yield put({type:authCommands.CHECK_ADMIN});
		yield put({type:authDocActions.AUTH_CLEAR});
	});
	yield takeEvery(authUiEvents.ADMIN_DASHBOARD_PAGE_LOAD, function*() {
		yield put({type:authCommands.CHECK_ADMIN});
	});
};

export {authUiSaga, authUiEvents};