import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import BaseUrl from "../baseurl";

const DISEASES_FETCH_MATCHES = "diseases.FETCH_MATCHES";
const DISEASES_CLEAR_MATCHES = "diseases.DISEASES_CLEAR_MATCHES";
const DISEASES_FETCH_MATCHES_SUCCEDED = "diseases.FETCH_MATCHES_SUCCEDED";
const DISEASES_FETCH_MATCHES_FAILED = "diseases.FETCH_MATCHES_FAILED";
const DISEASES_CREATE = "diseases.CREATE";
const DISEASES_CREATE_SUCCEDED = "diseases.CREATE_SUCCEDED";
const DISEASES_CREATE_FAILED = "diseases.CREATE_FAILED";


const fetchMatches = function*(action){
	console.log("here", action)
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/diseases?q=${action.payload.query}`);
		if (response.ok) {
			yield put({type: DISEASES_FETCH_MATCHES_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: DISEASES_FETCH_MATCHES_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: DISEASES_FETCH_MATCHES_FAILED, payload: err})
	}
};

const createDisease = function*(action){
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/disease`, {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: DISEASES_CREATE_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: DISEASES_CREATE_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: DISEASES_CREATE_FAILED, payload: err})
	}
};

const diseaseListSaga = function* () {
	yield takeLatest(DISEASES_FETCH_MATCHES, fetchMatches);
	yield takeEvery(DISEASES_CREATE, createDisease);
};

export {
	diseaseListSaga,
	DISEASES_FETCH_MATCHES,
	DISEASES_FETCH_MATCHES_SUCCEDED,
	DISEASES_FETCH_MATCHES_FAILED,
	DISEASES_CREATE,
	DISEASES_CREATE_SUCCEDED,
	DISEASES_CREATE_FAILED,
	DISEASES_CLEAR_MATCHES
}