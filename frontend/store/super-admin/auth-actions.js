import {call, put, takeEvery} from "redux-saga/effects";
import BaseUrl from "../baseurl"
import jsCookie from 'js-cookie';

const SUPER_SIGN_OUT_REQUESTED = "auth.SUPER_SIGN_OUT_REQUESTED";
const SUPER_SIGN_OUT_FAILED = "auth.SUPER_SIGN_OUT_FAILED";
const SUPER_SIGN_OUT_SUCCEEDED = "auth.SUPER_SIGN_OUT_SUCCEEDED";


const signOut = function*() {
	try {
		let token = jsCookie.get('token');
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/logout/${token}`);
		if (!response.ok) {
			yield put({type: SUPER_SIGN_OUT_FAILED, payload: response.json()})
		} else {
			yield put({type: SUPER_SIGN_OUT_SUCCEEDED, payload: response.json()})
		}
	} catch (err) {
		yield put({type: SUPER_SIGN_OUT_FAILED, payload: err})
	}
}

const adminSaga = function* () {
	yield takeEvery(SUPER_SIGN_OUT_REQUESTED, signOut);
}

export {
	SUPER_SIGN_OUT_REQUESTED,
	SUPER_SIGN_OUT_FAILED,
	SUPER_SIGN_OUT_SUCCEEDED,
	adminSaga
}