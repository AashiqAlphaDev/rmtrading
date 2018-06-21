import {call, put, takeEvery} from 'redux-saga/effects'
import base_url from "../base_url";
import {QUERY_VACCINATIONS} from "./actions";
import {QUERY_VACCINATIONS_SUCCEDED} from "./actions";
import {QUERY_VACCINATIONS_FAILED} from "./actions";

let fetchVaccinations = function* (action) {
	try {
		console.log(action)
		const response = yield call(fetch, `${base_url}/pets/${action.payload.pet_id}/vaccinations`, {
			method: "GET",
			credentials: 'include',
		});
		if (response.ok) {
			yield put({type: QUERY_VACCINATIONS_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: QUERY_VACCINATIONS_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: QUERY_VACCINATIONS_FAILED, payload: error});
	}
}


function* vaccinationsSaga() {
	yield takeEvery(QUERY_VACCINATIONS, fetchVaccinations)

}

export default vaccinationsSaga;
