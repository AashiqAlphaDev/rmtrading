import {takeEvery, put, race} from "redux-saga/effects";
import {authCommands} from "../auth/sagas";
import {dashboardUiActions} from "./dashboard";
import {authDocActions} from "../auth/reducers";

const uiEvents = {
	AUTH_PAGE_LOAD:"ui/events/AUTH_PAGE_LOAD",
	ADMIN_DASHBOARD_PAGE_LOAD:"ui/events/ADMIN_DASHBOARD_PAGE_LOAD",
};

let uiSaga = function*() {
	yield takeEvery(uiEvents.AUTH_PAGE_LOAD, function*() {
		yield put({type:authCommands.CHECK_ADMIN});
		yield put({type:authDocActions.AUTH_CLEAR});
	});
	yield takeEvery(uiEvents.ADMIN_DASHBOARD_PAGE_LOAD, function*() {
		yield put({type:authCommands.CHECK_ADMIN});
	});
	yield takeEvery(dashboardUiActions.SHOW_ERROR, function*() {
		setTimeout(race(function*(){
			yield put({type:dashboardUiActions.CLEAR_ERROR});
		}), 3000);
	});
};

export {uiSaga, uiEvents};