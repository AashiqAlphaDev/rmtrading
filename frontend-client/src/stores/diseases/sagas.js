import {call, put, takeEvery} from 'redux-saga/effects';
import {
	ADD_DISEASE_FAILED,
	ADD_DISEASE_SUCCEEDED,
	QUERY_DISEASES,
	REQUEST_ADD_DISEASE,
	DELETE_DISEASE_FAILED,
	DELETE_DISEASE_SUCCEEDED,
	QUERY_DISEASES_SUCCEEDED,
	QUERY_DISEASES_FAILED,
	REQUEST_DELETE_DISEASE
} from "./actions";
import base_url from "../base_url";

let queryDiseases = function* (action) {
	try {
		var url = (action.payload && action.payload.query) ? `${base_url}/app-data/diseases?q=${action.payload.query}` : `${base_url}/app-data/diseases`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: QUERY_DISEASES_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: QUERY_DISEASES_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		console.log(error)
		yield put({type: QUERY_DISEASES_FAILED, payload: error});
	}
};

let addDisease = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/app-data/diseases`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: ADD_DISEASE_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_DISEASE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_DISEASE_FAILED, payload: error});
	}
};


let deleteDisease = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/app-data/diseases/${action.payload.disease_id}`, {
			method: "DELETE",
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: DELETE_DISEASE_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: DELETE_DISEASE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_DISEASE_FAILED, payload: error});
	}
};

function* diseasesSaga() {
	yield takeEvery(QUERY_DISEASES, queryDiseases);
	yield takeEvery(REQUEST_ADD_DISEASE, addDisease);
	yield takeEvery(REQUEST_DELETE_DISEASE, deleteDisease);
	yield takeEvery(DELETE_DISEASE_SUCCEEDED, queryDiseases);
}

export default diseasesSaga;