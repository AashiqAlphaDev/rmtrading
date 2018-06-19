import {call, put, takeEvery} from 'redux-saga/effects';
import {
	ADD_VACCINE_FAILED,
	ADD_VACCINE_SUCCEDED,
	QUERY_VACCINES,
	REQUEST_ADD_VACCINE,
	DELETE_VACCINE_FAILED,
	DELETE_VACCINE_SUCCEDED,
	QUERY_VACCINES_SUCCEDED,
	QUERY_VACCINES_FAILED,
	REQUEST_DELETE_VACCINE, REQUEST_VACCINE_FETCH, VACCINE_FETCH_SUCCEDED, VACCINE_FETCH_FAILED
} from "./actions";
import base_url from "../base_url";
import {VET_CENTER_FETCH_FAILED, VET_CENTER_FETCH_SUCCEDED} from "../vet-centers/actions";

let queryVaccines = function* (action) {
	try {
		var url = (action.payload && action.payload.query) ? `${base_url}/vaccines?q=${action.payload.query}` : `${base_url}/vaccines`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: QUERY_VACCINES_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: QUERY_VACCINES_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: QUERY_VACCINES_FAILED, payload: error});
	}
};

let addVaccine = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccines`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: ADD_VACCINE_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_VACCINE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VACCINE_FAILED, payload: error});
	}
};


let deleteVaccine = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccines/${action.payload.vaccine_id}`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			yield put({type: DELETE_VACCINE_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: DELETE_VACCINE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_VACCINE_FAILED, payload: error});
	}
};

let fetchVaccine = function*(action){
	try{
		const response = yield call(fetch, `${base_url}/vaccines/${action.payload.vaccine_id}`);
		if(response.ok){
			yield put({type: VACCINE_FETCH_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: VACCINE_FETCH_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: VACCINE_FETCH_FAILED, payload:error});
	}
};

function* vaccinesSaga() {
	yield takeEvery(QUERY_VACCINES, queryVaccines);
	yield takeEvery(REQUEST_ADD_VACCINE, addVaccine);
	yield takeEvery(REQUEST_DELETE_VACCINE, deleteVaccine);
	yield takeEvery(DELETE_VACCINE_SUCCEDED, queryVaccines);
	yield takeEvery(REQUEST_VACCINE_FETCH, fetchVaccine);

}

export default vaccinesSaga;