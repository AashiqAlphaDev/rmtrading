import {call, put, takeEvery} from 'redux-saga/effects'
import base_url from "../base_url";
import {QUERY_VISITS} from "./actions";
import {QUERY_VISITS_SUCCEDED} from "./actions";
import {QUERY_VISITS_FAILED} from "./actions";
import {ADD_VISIT_FAILED, ADD_VISIT_SUCCEDED, REQUEST_ADD_VISIT} from "../pet-types/actions";

let fetchVisits = function* (action) {
	try {
		console.log(action)
		const response = yield call(fetch, `${base_url}/pets/${action.payload.pet_id}/visits`, {
			method: "GET",
			credentials: 'include',
		});
		if (response.ok) {
			yield put({type: QUERY_VISITS_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: QUERY_VISITS_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: QUERY_VISITS_FAILED, payload: error});
	}
}

let addVisit = function* (action) {
	try {
		console.log(action)
		const response = yield call(fetch, `${base_url}/pets/${action.payload.pet}/visits`, {
			method: "POST",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload.data)
		});
		if (response.ok) {
			yield put({type: ADD_VISIT_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_VISIT_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VISIT_FAILED, payload: error});
	}
};

function* visitsSaga() {
	yield takeEvery(QUERY_VISITS, fetchVisits);
	yield takeEvery(REQUEST_ADD_VISIT, addVisit);
}

export default visitsSaga;