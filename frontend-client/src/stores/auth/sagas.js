import {put, takeEvery} from 'redux-saga/effects'
import {actions as appActions, httpMethods} from "../app/saga";
import {authDocActions} from "./reducers"
import {authUiActions} from "../ui/auth";
import {dashboardUiActions} from "../ui/dashboard";

let authCommands = {
	CHECK_ADMIN: "auth/command/CHECK_ADMIN",
	CHECK_ADMIN_FAILED: "auth/command/CHECK_ADMIN_FAILED",
	CHECK_ADMIN_PASSED: "auth/command/CHECK_ADMIN_PASSED",
	CHECK_SUPER_ADMIN: "auth/command/CHECK_SUPER_ADMIN",
	CHECK_SUPER_ADMIN_FAILED: "auth/command/CHECK_SUPER_ADMIN_FAILED",
	CHECK_SUPER_ADMIN_PASSED: "auth/command/CHECK_SUPER_ADMIN_PASSED",
	LOGIN_FAILED: "auth/command/LOGIN_FAILED",
	LOGIN_SUCCEEDED: "auth/command/LOGIN_SUCCEEDED",
	LOGOUT_FAILED: "auth/command/LOGOUT_FAILED",
	LOGOUT_SUCCEEDED: "auth/command/LOGOUT_SUCCEEDED",
	LOGIN: "auth/command/REQUEST_LOGIN",
	LOGOUT: "auth/command/REQUEST_LOGOUT",
	SIGNUP: "auth/command/REQUEST_SIGNUP",
	SUPER_ADMIN_LOGIN: "auth/command/REQUEST_SUPER_ADMIN_LOGIN",
	SUPER_ADMIN_LOGOUT: "auth/command/REQUEST_SUPER_ADMIN_LOGOUT",
	SIGNUP_FAILED: "auth/command/SIGNUP_FAILED",
	SIGNUP_SUCCEEDED: "auth/command/SIGNUP_SUCCEEDED",
	SUPER_ADMIN_LOGIN_FAILED: "auth/command/SUPER_ADMIN_LOGIN_FAILED",
	SUPER_ADMIN_LOGIN_SUCCEEDED: "auth/command/SUPER_ADMIN_LOGIN_SUCCEEDED",
	SUPER_ADMIN_LOGOUT_FAILED: "auth/command/SUPER_ADMIN_LOGOUT_FAILED",
	SUPER_ADMIN_LOGOUT_SUCCEEDED: "auth/command/SUPER_ADMIN_LOGOUT_SUCCEEDED"
};

let authSaga = function* () {
	//login
	yield takeEvery(authCommands.LOGIN, function* (action) {
		yield put({type: authUiActions.SHOW_AUTH_PROGRESS});
		yield put({
			type: appActions.API,
			payload: {
				url: '/login',
				method: httpMethods.POST,
				body: action.payload,
				success: authCommands.LOGIN_SUCCEEDED,
				failure: authCommands.LOGIN_FAILED
			}
		});
	});
	yield takeEvery(authCommands.LOGIN_SUCCEEDED, function* (action) {
		yield put({...action, type: authDocActions.ADMIN_LOGIN});
	});

	//super admin login
	yield takeEvery(authCommands.SUPER_ADMIN_LOGIN, function* (action) {
		yield put({type: authUiActions.SHOW_AUTH_PROGRESS});
		yield put(appActions.API, {
			url: '/super-admin/login',
			method: httpMethods.POST,
			body: action.payload,
			success: authCommands.SUPER_ADMIN_LOGIN_SUCCEEDED,
			failure: authCommands.SUPER_ADMIN_LOGIN_FAILED
		});
	});
	yield takeEvery(authCommands.SUPER_ADMIN_LOGIN_SUCCEEDED, function* (action) {
		yield put({...action, type: authDocActions.SUPER_ADMIN_LOGIN});
	});

	//sign up
	yield takeEvery(authCommands.SIGNUP, function* (action) {
		yield put({type: authUiActions.SHOW_AUTH_PROGRESS});
		yield put(appActions.API, {
			url: '/register',
			method: httpMethods.POST,
			body: action.payload,
			success: authCommands.SIGNUP_SUCCEEDED,
			failure: authCommands.SIGNUP_FAILED
		});
	});

	//admin check
	yield takeEvery(authCommands.CHECK_ADMIN, function* () {
		yield put({type:dashboardUiActions.SET_ADMIN_CHECK_IN_PROGRESS});
		yield put({
			type: appActions.API, payload: {
				url: '/admin',
				success: authCommands.CHECK_ADMIN_PASSED,
				failure: authCommands.CHECK_ADMIN_FAILED
			}
		})
	});
	yield takeEvery(authCommands.CHECK_ADMIN_PASSED, function* () {
		yield put({type: authDocActions.ADMIN_LOGIN});
		yield put({type:dashboardUiActions.SET_ADMIN_CHECK_DONE});
	});
	yield takeEvery(authCommands.CHECK_ADMIN_FAILED, function* () {
		yield put({type:dashboardUiActions.SET_ADMIN_CHECK_DONE});
		yield put({type: authDocActions.CLEAR_AUTH});
	});

	//super admin check
	yield takeEvery(authCommands.CHECK_SUPER_ADMIN, function* () {
		yield put({
			type: appActions.API, payload: {
				url: '/super-admin',
				success: authCommands.CHECK_SUPER_ADMIN_PASSED,
				failure: authCommands.CHECK_SUPER_ADMIN_FAILED
			}
		})
	});
	yield takeEvery(authCommands.CHECK_SUPER_ADMIN_FAILED, function* () {
		yield put({type: authUiActions.CLEAR_AUTH});
	});


	//admin logout
	yield takeEvery(authCommands.LOGOUT, function* () {
		yield put({
			type: appActions.API, payload: {
				method: httpMethods.DELETE,
				url: '/logout',
				success: authCommands.LOGOUT_SUCCEEDED,
				failure: authCommands.LOGOUT_FAILED
			}
		})
	});
	yield takeEvery(authCommands.LOGOUT_SUCCEEDED, function* () {
		yield put({type: authUiActions.CLEAR_AUTH});
	});

	//super admin logout
	yield takeEvery(authCommands.SUPER_ADMIN_LOGOUT, function* () {
		yield put({
			type: appActions.API, payload: {
				method: httpMethods.DELETE,
				url: '/super-admin/logout',
				success: authCommands.SUPER_ADMIN_LOGOUT_SUCCEEDED,
				failure: authCommands.SUPER_ADMIN_LOGOUT_FAILED
			}
		});
	});
	yield takeEvery(authCommands.SUPER_ADMIN_LOGOUT_SUCCEEDED, function* () {
		yield put({type:authUiActions.CLEAR_AUTH});
	});
}

export {authSaga, authCommands};
