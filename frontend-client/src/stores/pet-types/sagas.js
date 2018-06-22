import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
    ADD_PET_TYPE_FAILED,
    ADD_PET_TYPE_SUCCEDED, ADD_BREED_FAILED, ADD_BREED_SUCCEDED,
    DELETE_PET_TYPE_FAILED,
    DELETE_PET_TYPE_SUCCEDED,
    QUERY_BREEDS_FAILED,
    QUERY_BREEDS_SUCCEDED,
    QUERY_PET_TYPES,
    QUERY_BREEDS,
    REQUEST_ADD_PET_TYPE,
    REQUEST_ADD_BREED, REQUEST_UPDATE_PET_TYPE,
    UPDATE_PET_TYPE_SUCCEEDED,
    UPDATE_PET_TYPE_FAILED, REQUEST_PET_TYPE_FETCH, PET_TYPE_FETCH_FAILED, PET_TYPE_FETCH_SUCCEDED

} from "./actions";
import base_url from "../base_url";
import {QUERY_PET_TYPES_FAILED, QUERY_PET_TYPES_SUCCEDED, REQUEST_DELETE_PET_TYPE} from "./actions";


let queryPetTypes = function* (action) {
	try {
		var url = (action.payload && action.payload.query) ? `${base_url}/app-data/pet-types?q=${action.payload.query}` : `${base_url}/app-data/pet-types`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: QUERY_PET_TYPES_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: QUERY_PET_TYPES_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: QUERY_PET_TYPES_FAILED, payload: error});
	}
};

let addPetType = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/app-data/pet-types`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: ADD_PET_TYPE_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_PET_TYPE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_PET_TYPE_FAILED, payload: error});
	}
};


let addBreed = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/app-data/pet-types/${action.payload.pet_type_id}/breeds`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload.breed_data)
		});
		if (response.ok) {
			yield put({type: ADD_BREED_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_BREED_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_BREED_FAILED, payload: error});
	}
};


let deletePetType = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/app-data/pet-types/${action.payload.pet_type_id}`, {
			method: "DELETE",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload.state_data)
		});
		if (response.ok) {
			yield put({type: DELETE_PET_TYPE_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: DELETE_PET_TYPE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: DELETE_PET_TYPE_FAILED, payload: error});
	}
};

let queryBreeds = function* (action) {
	try {
		var url = (action.payload && action.payload.query) ? `${base_url}/app-data/pet-types/${action.payload.pet_type_id}/breeds?q=${action.payload.query}` : `${base_url}/app-data/pet-types/${action.payload.pet_type_id}/breeds`;
		const response = yield call(fetch, url, {
			credentials: 'include'
		});
		if (response.ok) {
			yield put({type: QUERY_BREEDS_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: QUERY_BREEDS_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: QUERY_BREEDS_FAILED, payload: error});
	}
};


let updatePetType = function* (action) {
	try {
		let body=action.payload.data;
        const response = yield call(fetch, `${base_url}/app-data/pet-types/${action.payload.pet_type_id}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

		if (response.ok) {
			yield put({type: UPDATE_PET_TYPE_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: UPDATE_PET_TYPE_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: UPDATE_PET_TYPE_FAILED, payload: error});
	}
};

let fetchPetType = function*(action) {
    try {
        const response = yield call(fetch, `${base_url}/app-data/pet-types/${action.payload.pet_type_id}`, {
            credentials: 'include',
        });

        if (response.ok) {
            yield put({type: PET_TYPE_FETCH_SUCCEDED, payload: yield response.json()});
        }
        else {
            yield put({type: PET_TYPE_FETCH_FAILED, payload: yield response.json()});
        }
    } catch (error) {
        yield put({type: PET_TYPE_FETCH_FAILED, payload: error});
    }
}




function* petTypesSaga() {
	yield takeLatest(QUERY_PET_TYPES, queryPetTypes);
	yield takeLatest(QUERY_BREEDS, queryBreeds);
	yield takeEvery(REQUEST_ADD_PET_TYPE, addPetType);
    yield takeEvery(REQUEST_PET_TYPE_FETCH, fetchPetType);
	yield takeEvery(REQUEST_ADD_BREED, addBreed);
	yield takeEvery(REQUEST_DELETE_PET_TYPE, deletePetType);
	yield takeEvery(DELETE_PET_TYPE_SUCCEDED, queryPetTypes);
	yield takeEvery(REQUEST_UPDATE_PET_TYPE,updatePetType);

}

export default petTypesSaga;