import {call, put, takeEvery} from "redux-saga/effects";
import BaseUrl from "../baseurl"
import jsCookie from 'js-cookie';


const SIGN_OUT_REQUESTED = "auth.SIGN_OUT_REQUESTED";
const SIGN_IN_REQUESTED = "auth.SIGN_IN_REQUESTED";
const SUPER_SIGN_IN_REQUESTED = "auth.SUPER_SIGN_IN_REQUESTED";
const SUPER_SIGN_IN_SUCCEEDED = "auth.SUPER_SIGN_IN_SUCCEEDED";
const SUPER_SIGN_IN_FAILED = "auth.SUPER_SIGN_IN_FAILED";
const SIGN_IN_FAILED = "auth.SIGN_IN_FAILED";
const SIGN_IN_SUCCEEDED = "auth.SIGN_IN_SUCCEDED";
const SIGN_UP_REQUESTED = "auth.SIGN_UP_REQUESTED";
const SIGN_UP_FAILED = "auth.SIGN_UP_FAILED";
const SIGN_UP_SUCCEEDED = "auth.SIGN_UP_SUCCEDED";
const VERIFICATION_REQUESTED = "auth.VERIFICATION_REQUESTED";
const VERIFICATION_FAILED = "auth.VERIFICATION_FAILED";
const VERIFICATION_SUCCEEDED = "auth.VERIFICATION_SUCCEDED";
const RESET_ACCOUNT_REQUESTED = "auth.RESET_ACCOUNT_REQUESTED";
const RESET_ACCOUNT_FAILED = "auth.RESET_ACCOUNT_FAILED";
const RESET_ACCOUNT_SUCCEEDED = "auth.RESET_ACCOUNT_SUCCEDED";
const RESET_PASSWORD_REQUESTED = "auth.RESET_PASSWORD_REQUESTED";
const RESET_PASSWORD_FAILED = "auth.RESET_PASSWORD_FAILED";
const RESET_PASSWORD_SUCCEEDED = "auth.RESET_PASSWORD_SUCCEDED";


const superAdminLogin = function* (action) {
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(action.payload)
		});
		let responseData = yield response.json();
		if (!response.ok) {
			yield put({type: SUPER_SIGN_IN_FAILED, payload: responseData})
		} else {
			jsCookie.set('token', responseData.sessionID);
			yield put({type: SUPER_SIGN_IN_SUCCEEDED, payload: responseData})
		}
	} catch (err) {
		yield put({type: SUPER_SIGN_IN_FAILED, payload: err})
	}
}


const signIn = function* (action) {
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/auth/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(action.payload)
		})
		if (!response.ok) {
			yield put({type: SIGN_IN_FAILED, payload: response.json()})
		} else {
			yield put({type: SIGN_IN_SUCCEEDED, payload: response.json()})
		}
	} catch (err) {
		yield put({type: SIGN_IN_FAILED, payload: err})
	}
}


//Registration
const signUp = function* (action) {
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/auth/registration/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(action.payload)
		})
		if (!response.ok) {
			yield put({type: SIGN_UP_FAILED, payload: yield response.json()})
		} else {
			yield put({type: SIGN_UP_SUCCEEDED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: SIGN_UP_FAILED, payload: err})
	}
}

const verify = function* (action) {
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/auth/registration/verify-email`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(action.payload)
		})
		if (!response.ok) {
			yield put({type: VERIFICATION_FAILED, payload: response.json()})
		} else {
			yield put({type: VERIFICATION_SUCCEEDED, payload: response.json()})
		}
	} catch (err) {
		yield put({type: VERIFICATION_FAILED, payload: err})
	}
}

const resetAccount = function* (action) {
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/auth/reset`, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(action.payload)
		})
		if (!response.ok) {
			yield put({type: RESET_ACCOUNT_FAILED, payload: response.json()})
		} else {
			yield put({type: RESET_ACCOUNT_SUCCEEDED, payload: response.json()})
		}
	} catch (err) {
		yield put({type: RESET_ACCOUNT_FAILED, payload: err})
	}

}

const resetPassword = function* (action) {
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/auth/reset/confirm`, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(action.payload)
		})
		if (!response.ok) {
			yield put({type: RESET_PASSWORD_FAILED, payload: response.json()})
		} else {
			yield put({type: RESET_PASSWORD_SUCCEEDED, payload: response.json()})
		}
	} catch (err) {
		yield put({type: RESET_PASSWORD_FAILED, payload: err})
	}

}

const signOut = function* () {
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/auth/logout`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			yield put({type: SIGN_UP_FAILED, payload: response.json()})
		} else {
			yield put({type: SIGN_UP_SUCCEEDED, payload: response.json()})
		}
	} catch (err) {
		yield put({type: SIGN_UP_FAILED, payload: err})
	}
}


const authSaga = function* () {
	yield takeEvery(SIGN_IN_REQUESTED, signIn);
	yield takeEvery(SIGN_UP_REQUESTED, signUp);
	yield takeEvery(VERIFICATION_REQUESTED, verify);
	yield takeEvery(RESET_ACCOUNT_REQUESTED, resetAccount);
	yield takeEvery(RESET_PASSWORD_REQUESTED, resetPassword);
	yield takeEvery(SIGN_OUT_REQUESTED, signOut);
	yield takeEvery(SUPER_SIGN_IN_REQUESTED, superAdminLogin);
}

export {
	SIGN_OUT_REQUESTED,
	SIGN_IN_REQUESTED,
	SIGN_IN_FAILED,
	SIGN_IN_SUCCEEDED,
	SIGN_UP_REQUESTED,
	SIGN_UP_FAILED,
	SIGN_UP_SUCCEEDED,
	VERIFICATION_REQUESTED,
	VERIFICATION_FAILED,
	VERIFICATION_SUCCEEDED,
	RESET_ACCOUNT_REQUESTED,
	RESET_ACCOUNT_FAILED,
	RESET_ACCOUNT_SUCCEEDED,
	RESET_PASSWORD_REQUESTED,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_SUCCEEDED,
	SUPER_SIGN_IN_REQUESTED,
	SUPER_SIGN_IN_SUCCEEDED,
	SUPER_SIGN_IN_FAILED,
	authSaga
}