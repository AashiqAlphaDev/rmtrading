import {call, put, takeEvery,takeLatest} from 'redux-saga/effects';
import base_url from "../base_url";
import {
	GUARDIAN_FETCH_SUCCEDED,
	GUARDIAN_FETCH_FAILED,
	REQUEST_GUARDIAN_FETCH,
	REQUEST_CREATE_PET,
	CREATE_PET_SUCCEDED,
	CREATE_PET_FAILED, REQUEST_PET_FETCH, PET_FETCH_FAILED, PET_FETCH_SUCCEDED,

} from "./actions";


let fetchGuardian = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/users/by-mobile-or-gov-id/${action.payload.query}`, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: GUARDIAN_FETCH_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: GUARDIAN_FETCH_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: GUARDIAN_FETCH_FAILED, payload: error});
	}
};

let createPet = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/pets`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: CREATE_PET_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: CREATE_PET_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: CREATE_PET_FAILED, payload: error});
	}
}

let fetchPet = function* (action) {
	try {
		var url = null;
		if (action.payload.pet_id) {
			url = `${base_url}/pets/${action.payload.pet_id}`;
		}
		const response = yield call(fetch, url, {
			method: 'GET',
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: PET_FETCH_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: PET_FETCH_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: PET_FETCH_FAILED, payload: error});
	}
}

function* petsSaga() {
	yield takeLatest(REQUEST_GUARDIAN_FETCH, fetchGuardian);
	yield takeEvery(REQUEST_CREATE_PET, createPet);
	yield takeEvery(REQUEST_PET_FETCH, fetchPet);
}

export default petsSaga;