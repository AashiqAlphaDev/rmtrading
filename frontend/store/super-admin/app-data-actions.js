import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import BaseUrl from "../baseurl";

const DISEASES_FETCH_MATCHES = "diseases.FETCH_MATCHES";
const DISEASES_CLEAR_MATCHES = "diseases.DISEASES_CLEAR_MATCHES";
const DISEASES_FETCH_MATCHES_SUCCEDED = "diseases.FETCH_MATCHES_SUCCEDED";
const DISEASES_FETCH_MATCHES_FAILED = "diseases.FETCH_MATCHES_FAILED";
const DISEASES_CREATE = "diseases.CREATE";
const DISEASES_CREATE_SUCCEDED = "diseases.CREATE_SUCCEDED";
const DISEASES_CREATE_FAILED = "diseases.CREATE_FAILED";

const PET_TYPE_FETCH_MATCHES = "petTypes.FETCH_MATCHES";
const PET_TYPE_CLEAR_MATCHES = "petTypes.PET_TYPE_CLEAR_MATCHES";
const PET_TYPE_FETCH_MATCHES_SUCCEDED = "petTypes.PET_TYPE_FETCH_MATCHES_SUCCEDED";
const PET_TYPE_FETCH_MATCHES_FAILED = "petTypes.PET_TYPE_FETCH_MATCHES_FAILED";
const PET_TYPE_CREATE = "petTypes.PET_TYPE_CREATE";
const PET_TYPE_CREATE_SUCCEDED = "petTypes.PET_TYPE_CREATE_SUCCEDED";
const PET_TYPE_CREATE_FAILED = "petTypes.PET_TYPE_CREATE_FAILED";

const PET_BREED_FETCH_MATCHES = "petBreed.PET_BREED_FETCH_MATCHES";
const PET_BREED_CLEAR_MATCHES = "petBreed.PET_BREED_CLEAR_MATCHES";
const PET_BREED_FETCH_MATCHES_SUCCEDED = "petBreed.PET_BREED_FETCH_MATCHES_SUCCEDED";
const PET_BREED_FETCH_MATCHES_FAILED = "petBreed.PET_BREED_FETCH_MATCHES_FAILED";
const PET_BREED_CREATE = "petBreed.PET_BREED_CREATE";
const PET_BREED_CREATE_SUCCEDED = "petBreed.PET_BREED_CREATE_SUCCEDED";
const PET_BREED_CREATE_FAILED = "petBreed.PET_BREED_CREATE_FAILED";


const fetchDiseaseMatches = function*(action){
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/diseases?q=${action.payload.query}`);
		if (response.ok) {
			yield put({type: DISEASES_FETCH_MATCHES_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: DISEASES_FETCH_MATCHES_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: DISEASES_FETCH_MATCHES_FAILED, payload: err})
	}
};


const fetchPetTypeMatches = function*(action){
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/pet-types?q=${action.payload.query}`);
		if (response.ok) {
			yield put({type: PET_TYPE_FETCH_MATCHES_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: PET_TYPE_FETCH_MATCHES_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: PET_TYPE_FETCH_MATCHES_FAILED, payload: err})
	}
};


const fetchPetBreedMatches = function*(action){
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/pet-types/${action.payload.pet_type_id}/breed?q=${action.payload.query}`);
		if (response.ok) {
			yield put({type: PET_BREED_FETCH_MATCHES_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: PET_BREED_FETCH_MATCHES_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: PET_BREED_FETCH_MATCHES_FAILED, payload: err})
	}
};

const createPetType = function*(action){
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/pet-types`, {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: PET_TYPE_CREATE_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: PET_TYPE_CREATE_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: PET_TYPE_CREATE_FAILED, payload: err})
	}
};


const createDisease = function*(action){
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/diseases`, {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: DISEASES_CREATE_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: DISEASES_CREATE_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: DISEASES_CREATE_FAILED, payload: err})
	}
};


const createPetBreed = function*(action){
	try {
		let response = yield call(fetch, `${BaseUrl.frontend}/super-admin/pet-types/${action.payload.pet_type_id}/breed`, {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: PET_BREED_CREATE_SUCCEDED, payload: yield response.json()})
		} else {
			yield put({type: PET_BREED_CREATE_FAILED, payload: yield response.json()})
		}
	} catch (err) {
		yield put({type: PET_BREED_CREATE_FAILED, payload: err})
	}
};

const appDataSaga = function* () {
	yield takeLatest(DISEASES_FETCH_MATCHES, fetchDiseaseMatches);
	yield takeEvery(DISEASES_CREATE, createDisease);
	yield takeLatest(PET_TYPE_FETCH_MATCHES, fetchPetTypeMatches);
	yield takeEvery(PET_TYPE_CREATE, createPetType);
	yield takeLatest(PET_BREED_FETCH_MATCHES, fetchPetBreedMatches);
	yield takeEvery(PET_BREED_CREATE, createPetBreed);
};

export {
	appDataSaga,

	DISEASES_FETCH_MATCHES,
	DISEASES_FETCH_MATCHES_SUCCEDED,
	DISEASES_FETCH_MATCHES_FAILED,
	DISEASES_CREATE,
	DISEASES_CREATE_SUCCEDED,
	DISEASES_CREATE_FAILED,
	DISEASES_CLEAR_MATCHES,

	PET_TYPE_FETCH_MATCHES,
	PET_TYPE_CLEAR_MATCHES,
	PET_TYPE_FETCH_MATCHES_SUCCEDED,
	PET_TYPE_FETCH_MATCHES_FAILED,
	PET_TYPE_CREATE,
	PET_TYPE_CREATE_SUCCEDED,
	PET_TYPE_CREATE_FAILED,

	PET_BREED_FETCH_MATCHES,
	PET_BREED_CLEAR_MATCHES,
	PET_BREED_FETCH_MATCHES_SUCCEDED,
	PET_BREED_FETCH_MATCHES_FAILED,
	PET_BREED_CREATE,
	PET_BREED_CREATE_SUCCEDED,
	PET_BREED_CREATE_FAILED,
}