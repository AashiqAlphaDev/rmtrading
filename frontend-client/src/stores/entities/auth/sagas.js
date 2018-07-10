import {put, takeEvery} from 'redux-saga/effects'
import {appActions, httpMethods} from "../../app/saga";
import {authDocActions} from "./reducers"

let authCommands = {
	CHECK_ADMIN: "auth/command/CHECK_ADMIN",
	CHECK_SUPER_ADMIN: "auth/command/CHECK_SUPER_ADMIN",
	LOGIN: "auth/command/LOGIN",
	LOGOUT: "auth/command/LOGOUT",
	SIGN_UP: "auth/command/SIGNUP",
	SUPER_ADMIN_LOGIN: "auth/command/SUPER_ADMIN_LOGIN",
	SUPER_ADMIN_LOGOUT: "auth/command/SUPER_ADMIN_LOGOUT",
};

let authEvents = {

	SIGN_UP_STARTED: "auth/events/SIGN_UP_STARTED",
	SIGN_UP_FAILED: "auth/events/SIGN_UP_FAILED",
	SIGN_UP_SUCCEEDED: "auth/events/SIGN_UP_SUCCEEDED",

	SUPER_ADMIN_LOGIN_STARTED: "auth/events/SUPER_ADMIN_LOGIN_STARTED",
	SUPER_ADMIN_LOGIN_FAILED: "auth/events/SUPER_ADMIN_LOGIN_FAILED",
	SUPER_ADMIN_LOGIN_SUCCEEDED: "auth/events/SUPER_ADMIN_LOGIN_SUCCEEDED",

	SUPER_ADMIN_LOGOUT_STARTED: "auth/events/SUPER_ADMIN_LOGOUT_STARTED",
	SUPER_ADMIN_LOGOUT_FAILED: "auth/events/SUPER_ADMIN_LOGOUT_FAILED",
	SUPER_ADMIN_LOGOUT_SUCCEEDED: "auth/events/SUPER_ADMIN_LOGOUT_SUCCEEDED",

	CHECK_SUPER_ADMIN_STARTED: "auth/events/CHECK_SUPER_ADMIN_STARTED",
	CHECK_SUPER_ADMIN_FAILED: "auth/events/CHECK_SUPER_ADMIN_FAILED",
	CHECK_SUPER_ADMIN_PASSED: "auth/events/CHECK_SUPER_ADMIN_PASSED",

	LOGIN_STARTED: "auth/events/LOGIN_STARTED",
	LOGIN_FAILED: "auth/events/LOGIN_FAILED",
	LOGIN_SUCCEEDED: "auth/events/LOGIN_SUCCEEDED",

	LOGOUT_STARTED: "auth/events/LOGOUT_STARTED",
	LOGOUT_FAILED: "auth/events/LOGOUT_FAILED",
	LOGOUT_SUCCEEDED: "auth/events/LOGOUT_SUCCEEDED",

	CHECK_ADMIN_STARTED: "auth/events/CHECK_ADMIN_STARTED",
	CHECK_ADMIN_FAILED: "auth/events/CHECK_ADMIN_FAILED",
	CHECK_ADMIN_PASSED: "auth/events/CHECK_ADMIN_PASSED",
}

let authSaga = function* () {
	//login
	yield takeEvery(authCommands.LOGIN, function* (action) {
		yield put({type:authEvents.LOGIN_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: '/login',
				method: httpMethods.POST,
				body: action.payload
			},
			meta: {
				postFailureAction: authEvents.LOGIN_FAILED,
				postSuccessAction: authEvents.LOGIN_SUCCEEDED
			}
		});
	});

	//super admin login
	yield takeEvery(authCommands.SUPER_ADMIN_LOGIN, function* (action) {
		yield put({
			type: appActions.API,
			payload: {
				url: '/super-admin/login',
				method: httpMethods.POST,
				body: action.payload,
			},
			meta: {
				startAction:authEvents.SUPER_ADMIN_LOGIN_STARTED,
				postSuccessAction: authDocActions.SUPER_ADMIN_LOGIN_SUCCEEDED,
				onSuccess: function* (payload) {
					yield put({payload: payload, type: authDocActions.SUPER_ADMIN_LOGIN});
				},
				onFailure: function* (payload) {
					yield put({payload: payload, type: authDocActions.SUPER_ADMIN_LOGIN_FAILED});
				}
			}
		});
	});

	//sign up
	yield takeEvery(authCommands.SIGN_UP, function* (action) {
		yield put({
			type: appActions.API,
			payload: {
				url: '/register',
				method: httpMethods.POST,
				body: action.payload,
				success: authCommands.SIGN_UP_SUCCEEDED,
				failure: authCommands.SIGN_UP_FAILED
			},
			meta: {
				startAction:authEvents.SIGN_UP_STARTED,
				success: function* (payload) {
					yield put({payload: payload, type: authDocActions.SUPER_ADMIN_LOGIN_FAILED});
				},
				failure: function* (payload) {

				}
			}
		});
	});

	//admin check
	yield takeEvery(authCommands.CHECK_ADMIN, function* () {
		yield put({type:authEvents.CHECK_ADMIN_STARTED});
		yield put({
			type: appActions.API,
			payload: {
				url: '/admin',
			},
			meta: {
				postSuccessAction: authEvents.CHECK_ADMIN_PASSED,
				postFailureAction: authEvents.CHECK_ADMIN_FAILED,
				onSuccess: function* () {
					yield put({type:authDocActions.ADMIN_LOGIN});
				},
				onFailure: function* () {
					yield put({type: authDocActions.RESET});
				}
			}
		})
	});

	//super admin check
	yield takeEvery(authCommands.CHECK_SUPER_ADMIN, function* () {
		yield put({
			type: appActions.API, payload: {
				url: '/super-admin',
			},
			meta: {
				startAction:authEvents.CHECK_SUPER_ADMIN_STARTED,
				postFailureAction: authEvents.CHECK_SUPER_ADMIN_FAILED
			}
		})
	});


	//admin logout
	yield takeEvery(authCommands.LOGOUT, function* () {
		yield put({
			type: appActions.API, payload: {
				method: httpMethods.DELETE,
				url: '/logout'
			},
			meta: {
				startAction:authEvents.LOGOUT_STARTED,
				postSuccessAction: authEvents.LOGOUT_SUCCEEDED,
			}
		})
	});

	//super admin logout
	yield takeEvery(authCommands.SUPER_ADMIN_LOGOUT, function* () {
		yield put({
			type: appActions.API,
			payload: {
				method: httpMethods.DELETE,
				url: '/super-admin/logout'
			},
			meta: {
				startAction:authEvents.SUPER_ADMIN_LOGOUT_STARTED,
				postSuccessAction: authEvents.SUPER_ADMIN_LOGOUT_SUCCEEDED,
				postFailureAction: authEvents.SUPER_ADMIN_LOGOUT_FAILED,
			}
		});
	});
}

export {authSaga, authCommands, authEvents};
