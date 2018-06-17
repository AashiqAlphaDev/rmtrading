import { call, put, takeEvery,takeLatest} from 'redux-saga/effects';
import {
	ADD_COUNTRY_FAILED, ADD_COUNTRY_SUCCEDED, DELETE_COUNTRY_FAILED, DELETE_COUNTRY_SUCCEDED,
	QUERY_COUNTRIES, REQUEST_ADD_COUNTRY,
} from "./actions";
import base_url from "../base_url";
import {FAILED_FETCH_COUNTRIES, FETCHED_COUNTRIES,REQUEST_DELETE_COUNTRY} from "./actions";


let queryCountries = function*(action){
	try {
		const response = yield call(fetch, `${base_url}/app-data/countries?q=${action.payload.query}`, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: FETCHED_COUNTRIES, payload:yield response.json()});
		}
		else {
			yield put({type: FAILED_FETCH_COUNTRIES, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: FAILED_FETCH_COUNTRIES, payload:error});
	}
};

let addCountry = function*(action) {
	try{
		const response = yield call(fetch, `${base_url}/app-data/countries`, {
			method:"POST",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: ADD_COUNTRY_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_COUNTRY_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_COUNTRY_FAILED, payload:error});
	}
};


let deleteCountry = function*(action) {
	try{
		const response = yield call(fetch, `${base_url}/app-data/countries/${action.payload.center_id}`, {
			method:"DELETE",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: DELETE_COUNTRY_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: DELETE_COUNTRY_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_COUNTRY_FAILED, payload:error});
	}
};

let queryStates = function*(action) {
	try {
		const response = yield call(fetch, `${base_url}/app-data/countries/${action.payload.country_id}/states?q=${action.payload.query}`, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: FETCHED_COUNTRIES, payload:yield response.json()});
		}
		else {
			yield put({type: FAILED_FETCH_COUNTRIES, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: FAILED_FETCH_COUNTRIES, payload:error});
	}
};


function* countriesSaga() {
	yield takeLatest(QUERY_COUNTRIES, queryCountries);
	yield takeLatest(QUERY_STATES, queryStates);
	yield takeEvery(REQUEST_ADD_COUNTRY, addCountry);
	yield takeEvery(REQUEST_DELETE_COUNTRY, deleteCountry);
}

export default countriesSaga;