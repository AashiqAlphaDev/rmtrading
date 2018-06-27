import {takeEvery, put} from "redux-saga/effects";
import {authCommands} from "../auth/sagas";
import {authUiActions} from "./auth";

const uiEvents = {
	AUTH_PAGE_LOAD:"ui/events/AUTH_PAGE_LOAD",
	ADMIN_DASHBOARD_PAGE_LOAD:"ui/events/ADMIN_DASHBOARD_PAGE_LOAD",
};

let uiSaga = function*() {
	yield takeEvery(uiEvents.AUTH_PAGE_LOAD, function*() {
		yield put({type:authCommands.CHECK_ADMIN});
		yield put({type:authUiActions.AUTH_CLEAR});
	});
	yield takeEvery(uiEvents.ADMIN_DASHBOARD_PAGE_LOAD, function*() {
		yield put({type:authCommands.CHECK_ADMIN});
	});
};

export {uiSaga, uiEvents};