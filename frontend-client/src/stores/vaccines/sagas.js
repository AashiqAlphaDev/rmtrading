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
	REQUEST_DELETE_VACCINE
} from "./actions";
import base_url from "../base_url";

let queryVaccines = function* (action) {
	try {
		var url = (action.payload && action.payload.query) ? `${base_url}/vaccines?q=${action.payload.query}` : `${base_url}/vaccination-centers`;
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
		const response = yield call(fetch, `${base_url}/vaccines/${action.payload.center_id}`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
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

function* vaccinesSaga() {
	yield takeEvery(QUERY_VACCINES, queryVaccines);
	yield takeEvery(REQUEST_ADD_VACCINE, addVaccine);
	yield takeEvery(REQUEST_DELETE_VACCINE, deleteVaccine);
	yield takeEvery(DELETE_VACCINE_SUCCEDED, queryVaccines);
}

export default vaccinesSaga;