import { call, put, takeEvery} from 'redux-saga/effects';
import {
	ADD_VET_CENTER_FAILED,
	ADD_VET_CENTER_SUCCEDED,
	QUERY_VET_CENTERS,
	REQUEST_ADD_VET_CENTER,
	DELETE_VET_CENTER_FAILED,
	DELETE_VET_CENTER_SUCCEDED,
	QUERY_VET_CENTERS_SUCCEDED,
	QUERY_VET_CENTERS_FAILED,
	REQUEST_DELETE_VET_CENTER,
	REQUEST_VET_CENTER_FETCH,
	VET_CENTER_FETCH_SUCCEDED,
	VET_CENTER_FETCH_FAILED,
	CLEAR_VET_CENTER,
	REQUEST_ADD_ADMIN,
	ADD_ADMIN_SUCCEDED,
	ADD_ADMIN_FAILED,
	REQUEST_ADMINS_FETCH,
	ADMINS_FETCH_SUCCEDED, ADMINS_FETCH_FAILED, DELETE_ADMIN_SUCCEDED, DELETE_ADMIN_FAILED, REQUEST_DELETE_ADMIN
} from "./actions";
import base_url from "../base_url";

let queryVetCenters = function*(action){
	try {
		var url = (action.payload && action.payload.query)?`${base_url}/vaccination-centers?query=${action.payload.query}`:`${base_url}/vaccination-centers`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: QUERY_VET_CENTERS_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: QUERY_VET_CENTERS_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		console.log(error)
		yield put({type: QUERY_VET_CENTERS_FAILED, payload:error});
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
			yield put({type: DELETE_VET_CENTER_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: DELETE_VET_CENTER_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_VET_CENTER_FAILED, payload:error});
	}
};

let fetchVetCenter = function*(action){
	try{
		yield put({type: CLEAR_VET_CENTER})
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}`);
		if(response.ok){
			yield put({type: VET_CENTER_FETCH_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: VET_CENTER_FETCH_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: VET_CENTER_FETCH_FAILED, payload:error});
	}
};

let addAdmin = function*(action){
	try{
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}/admins`, {
			method:"POST",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: ADD_ADMIN_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_ADMIN_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_ADMIN_FAILED, payload:error});
	}
};

let deleteAdmin = function*(action){
	try{
		const response = yield call(fetch, `${base_url}/vaccination-centers/${action.payload.center_id}/admins/${action.payload.admin_id}`, {
			method:"DELETE",
			credentials: 'include',
		});
		if(response.ok){
			yield put({type: DELETE_ADMIN_SUCCEDED, payload:yield response.json()});
			yield put({type: REQUEST_ADMINS_FETCH, payload:{center_id:action.payload.center_id}});
		}
		else {
			yield put({type: DELETE_ADMIN_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_ADMIN_FAILED, payload:error});
	}
}


let fetchAdmins = function*(action){
	try{
		var center_id =  action.payload.center_id || action.payload.vaccination_center || action.payload._id;
		const response = yield call(fetch, `${base_url}/vaccination-centers/${center_id}/admins`, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: ADMINS_FETCH_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADMINS_FETCH_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADMINS_FETCH_FAILED, payload:error});
	}
};



function* vetCentersSaga() {
	yield takeEvery(QUERY_VET_CENTERS, queryVetCenters);
	yield takeEvery(REQUEST_ADD_VET_CENTER, addVetCenter);
	yield takeEvery(REQUEST_DELETE_VET_CENTER, deleteVetCenter);
	yield takeEvery(DELETE_VET_CENTER_SUCCEDED, queryVetCenters);
	yield takeEvery(REQUEST_VET_CENTER_FETCH, fetchVetCenter);
	yield takeEvery(REQUEST_ADD_ADMIN, addAdmin);
	yield takeEvery(ADD_ADMIN_SUCCEDED, fetchAdmins);
	yield takeEvery(REQUEST_ADMINS_FETCH, fetchAdmins);
	yield takeEvery(VET_CENTER_FETCH_SUCCEDED, fetchAdmins);
	yield takeEvery(REQUEST_DELETE_ADMIN, deleteAdmin);
}

export default vetCentersSaga;