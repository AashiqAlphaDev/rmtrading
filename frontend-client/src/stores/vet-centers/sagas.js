import { call, put, takeEvery} from 'redux-saga/effects';
import {
	ADD_VET_CENTER_FAILED, ADD_VET_CENTER_SUCCEDED,
	QUERY_VET_CENTERS, REQUEST_ADD_VET_CENTER,
} from "./actions";
import base_url from "../base_url";
import {FAILED_FETCH_VET_CENTERS, FETCHED_VET_CENTERS,REQUEST_UPDATE_VET_CENTER,REQUEST_DELETE_VET_CENTER} from "./actions";


let queryVetCenters = function*(action){
	try {
		var url = action.payload?`${base_url}/vaccination-centers?query=${action.payload.query}`:`${base_url}/vaccination-centers`;
		console.log(url);
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: FETCHED_VET_CENTERS, payload:yield response.json()});
		}
		else {
			yield put({type: FAILED_FETCH_VET_CENTERS, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: FAILED_FETCH_VET_CENTERS, payload:error});
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
			yield put({type: ADD_VET_CENTER_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_VET_CENTER_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VET_CENTER_FAILED, payload:error});
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
			yield put({type: ADD_VET_CENTER_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_VET_CENTER_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VET_CENTER_FAILED, payload:error});
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
			yield put({type: ADD_VET_CENTER_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_VET_CENTER_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_VET_CENTER_FAILED, payload:error});
	}
};



function* vetCentersSaga() {
	yield takeEvery(QUERY_VET_CENTERS, queryVetCenters);
	yield takeEvery(REQUEST_ADD_VET_CENTER, addVetCenter);
	yield takeEvery(REQUEST_UPDATE_VET_CENTER, updateVetCenter);
	yield takeEvery(REQUEST_DELETE_VET_CENTER, deleteVetCenter);
}

export default vetCentersSaga;