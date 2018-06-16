import { call, put, takeEvery} from 'redux-saga/effects';
import {
	ADD_VACCINE_FAILED, ADD_VACCINE_SUCCEDED,
	QUERY_VACCINES, REQUEST_ADD_VACCINE,
} from "./actions";
import base_url from "../base_url";
import {FAILED_FETCH_VACCINES, FETCHED_VACCINES,REQUEST_UPDATE_VACCINE,REQUEST_DELETE_VACCINE} from "./actions";


let queryVaccines = function*(action){
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers?query=${action.payload.query}`, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: FETCHED_VACCINES, payload:yield response.json()});
		}
		else {
			yield put({type: FAILED_FETCH_VACCINES, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: FAILED_FETCH_VACCINES, payload:error});
	}
};

let addVetCenter = function*(action) {
	try{
		const response = yield call(fetch, `${base_url}/vaccination-centers`, {
			method:"POST",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: ADD_VACCINE_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_VACCINE_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VACCINE_FAILED, payload:error});
	}
};


let deleteVetCenter = function*(action) {
	try{
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`, {
			method:"DELETE",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: ADD_VACCINE_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_VACCINE_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VACCINE_FAILED, payload:error});
	}
};

let updateVetCenter = function*(action) {
	try{
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`, {
			method:"PUT",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: ADD_VACCINE_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_VACCINE_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VACCINE_FAILED, payload:error});
	}
};



function* vetCentersSaga() {
	yield takeEvery(QUERY_VACCINES, queryVaccines);
	yield takeEvery(REQUEST_ADD_VACCINE, addVetCenter);
	yield takeEvery(REQUEST_UPDATE_VACCINE, updateVetCenter);
	yield takeEvery(REQUEST_DELETE_VACCINE, deleteVetCenter);
}

export default vetCentersSaga;