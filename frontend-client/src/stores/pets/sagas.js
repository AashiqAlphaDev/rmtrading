import { call, put, takeEvery} from 'redux-saga/effects';
import base_url from "../base_url";
import {
	GUARDIAN_FETCH_SUCCEDED,
	GUARDIAN_FETCH_FAILED,
	REQUEST_GUARDIAN_FETCH,
	REQUEST_CREATE_PET,
	CREATE_PET_SUCCEDED, CREATE_PET_FAILED
} from "./actions";


let fetchGuardian = function*(action){
    try {
        const response = yield call(fetch, `${base_url}/users/by-mobile-or-gov-id/${action.payload.query}`, {
            credentials: 'include'
        });
        if(response.ok){
            yield put({type: GUARDIAN_FETCH_SUCCEDED, payload:yield response.json()});
        }
        else {
            yield put({type: GUARDIAN_FETCH_FAILED, payload:yield response.json()});
        }
    } catch (error) {
        yield put({type: GUARDIAN_FETCH_FAILED, payload:error});
    }
};

let createPet = function*(action){
	try {
		const response = yield call(fetch, `${base_url}/pets`, {
		    method:'POST',
			credentials: 'include',
			headers:{
		        "Content-Type":"application/json"
            },
            body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: CREATE_PET_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: CREATE_PET_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: CREATE_PET_FAILED, payload:error});
	}
}

function* petsSaga() {
	yield takeEvery(REQUEST_GUARDIAN_FETCH, fetchGuardian);
	yield takeEvery(REQUEST_CREATE_PET, createPet);
}

export default petsSaga;