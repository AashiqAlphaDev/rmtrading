import {call, put, takeEvery} from "redux-saga/effects";
import BaseUrl from "../baseurl"
import jsCookie from 'js-cookie';

const INTERESTS_REQUESTED = "appData.INTERESTS_REQUESTED";
const INTERESTS_FETCHED = "appData.INTERESTS_FETCHED";
const INTERESTS_FETCH_FAILED = "appData.INTERESTS_FETCH_FAILED";


const signOut = function* () {
	try {
		let token = jsCookie.get('token');
		console.log(BaseUrl.frontend)
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

const appDataSaga = function* () {
	yield takeEvery(INTERESTS_REQUESTED, signOut);
}

export {
	INTERESTS_REQUESTED,
	INTERESTS_FETCHED,
	INTERESTS_FETCH_FAILED,
	appDataSaga
}