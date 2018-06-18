import { call, put, takeEvery,takeLatest} from 'redux-saga/effects';
import {
	ADD_COUNTRY_FAILED,
	ADD_COUNTRY_SUCCEDED, ADD_STATE_FAILED, ADD_STATE_SUCCEDED,
	DELETE_COUNTRY_FAILED,
	DELETE_COUNTRY_SUCCEDED,
	QUERY_STATES_FAILED,
	QUERY_STATES_SUCCEDED,
	QUERY_COUNTRIES,
	QUERY_STATES,
	REQUEST_ADD_COUNTRY,
	REQUEST_ADD_STATE,
} from "./actions";
import base_url from "../base_url";
import {QUERY_COUNTRIES_FAILED, QUERY_COUNTRIES_SUCCEDED,REQUEST_DELETE_COUNTRY} from "./actions";


let queryCountries = function*(action){
	try {
		var url = (action.payload && action.payload.query)?`${base_url}/app-data/countries?q=${action.payload.query}`:`${base_url}/app-data/countries`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if(response.ok){
			yield put({type: QUERY_COUNTRIES_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: QUERY_COUNTRIES_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: QUERY_COUNTRIES_FAILED, payload:error});
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


let addState = function*(action) {
	try{
		const response = yield call(fetch, `${base_url}/app-data/countries/${action.payload.country_id}/states`, {
			method:"POST",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload.state_data)
		});
		if(response.ok){
			yield put({type: ADD_STATE_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: ADD_STATE_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_STATE_FAILED, payload:error});
	}
};


let deleteCountry = function*(action) {
	try{
		const response = yield call(fetch, `${base_url}/app-data/countries/${action.payload.country_id}`, {
			method:"DELETE",
			credentials: 'include',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload.state_data)
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
			yield put({type: QUERY_STATES_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: QUERY_STATES_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		yield put({type: QUERY_STATES_FAILED, payload:error});
	}
};


function* countriesSaga() {
	yield takeLatest(QUERY_COUNTRIES, queryCountries);
	yield takeLatest(QUERY_STATES, queryStates);
	yield takeEvery(REQUEST_ADD_COUNTRY, addCountry);
	yield takeEvery(REQUEST_ADD_STATE, addState);
	yield takeEvery(REQUEST_DELETE_COUNTRY, deleteCountry);
	yield takeEvery(DELETE_COUNTRY_SUCCEDED, queryCountries);
}

export default countriesSaga;