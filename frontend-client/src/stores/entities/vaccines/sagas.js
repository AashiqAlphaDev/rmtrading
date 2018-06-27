import {call, put, takeEvery} from 'redux-saga/effects';
import {
	ADD_VACCINE_FAILED,
	ADD_VACCINE_SUCCEEDED,
	QUERY_VACCINES,
	REQUEST_ADD_VACCINE,
	DELETE_VACCINE_FAILED,
	DELETE_VACCINE_SUCCEEDED,
	QUERY_VACCINES_SUCCEEDED,
	QUERY_VACCINES_FAILED,
	REQUEST_DELETE_VACCINE,
	REQUEST_VACCINE_FETCH,
	VACCINE_FETCH_SUCCEEDED,
	VACCINE_FETCH_FAILED,
	REQUEST_ADD_DOSAGE,
	ADD_DOSAGE_SUCCEEDED, ADD_DOSAGE_FAILED, REQUEST_DELETE_DOSAGE, DELETE_DOSAGE_SUCCEEDED, DELETE_DOSAGE_FAILED
} from "./actions";
import base_url from "../base_url";

let queryVaccines = function* (action) {
	try {
		var url = (action.payload && action.payload.query) ? `${base_url}/vaccines?q=${action.payload.query}` : `${base_url}/vaccines`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: QUERY_VACCINES_SUCCEEDED, payload: yield response.json()});
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
			yield put({type: ADD_VACCINE_SUCCEEDED, payload: yield response.json()});
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
			yield put({type: DELETE_VACCINE_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: DELETE_VACCINE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_VACCINE_FAILED, payload: error});
	}
};

let fetchVaccine = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/vaccines/${action.payload.vaccine_id}`);
		if (response.ok) {
			yield put({type: VACCINE_FETCH_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: VACCINE_FETCH_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: VACCINE_FETCH_FAILED, payload: error});
	}
};

let deleteDosage = function* (action) {
	try {
		var body;
		switch (action.payload.dosageType) {
			default:
			case "child": {
				body = {$pull: {child_vaccine_schedules: {_id: action.payload.schedule_id}}}
				break;
			}
			case "adult": {
				body = {$pull: {adult_vaccine_schedules: {_id: action.payload.schedule_id}}}
				break;
			}
			case "booster": {
				body = {$pull: {booster_vaccine_schedules: {_id: action.payload.schedule_id}}}
				break;
			}
		}
		const response = yield call(fetch, `${base_url}/vaccines/${action.payload.vaccine_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
		if (response.ok) {
			yield put({type: DELETE_DOSAGE_SUCCEEDED, payload: {vaccine_id: action.payload.vaccine_id}});
		}
		else {
			yield put({type: DELETE_DOSAGE_FAILED, payload: yield response.json()});
		}
	} catch (e) {
		yield put({type: DELETE_DOSAGE_FAILED, payload: e});
	}
};


let addDosage = function* (action) {
	try {
		var body;
		switch (action.payload.dosageType) {
			default:
			case "child": {
				body = {$push: {child_vaccine_schedules: action.payload.schedule_data}}
				break;
			}
			case "adult": {
				body = {$push: {adult_vaccine_schedules: action.payload.schedule_data}}
				break;
			}
			case "booster": {
				body = {$push: {booster_vaccine_schedules: action.payload.schedule_data}}
				break;
			}
		}
		console.log(action.payload);
		const response = yield call(fetch, `${base_url}/vaccines/${action.payload.vaccine_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
		if (response.ok) {
			yield put({type: ADD_DOSAGE_SUCCEEDED, payload: {vaccine_id: action.payload.vaccine_id}});
		}
		else {
			yield put({type: ADD_DOSAGE_FAILED, payload: yield response.json()});
		}
	} catch (e) {
		yield put({type: ADD_DOSAGE_FAILED, payload: e});
	}
};

function* vaccinesSaga() {
	yield takeEvery(QUERY_VACCINES, queryVaccines);
	yield takeEvery(REQUEST_ADD_VACCINE, addVaccine);
	yield takeEvery(REQUEST_DELETE_VACCINE, deleteVaccine);
	yield takeEvery(DELETE_VACCINE_SUCCEEDED, queryVaccines);
	yield takeEvery(REQUEST_VACCINE_FETCH, fetchVaccine);
	yield takeEvery(REQUEST_ADD_DOSAGE, addDosage);
	yield takeEvery(REQUEST_DELETE_DOSAGE, deleteDosage);
	yield takeEvery(DELETE_DOSAGE_SUCCEEDED, fetchVaccine);
	yield takeEvery(ADD_DOSAGE_SUCCEEDED, fetchVaccine);
}

export default vaccinesSaga;