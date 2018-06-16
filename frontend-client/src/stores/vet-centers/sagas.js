import { call, put, takeEvery} from 'redux-saga/effects'
import {
	QUERY_VET_CENTERS,
} from "./actions";
import base_url from "../base_url";
import {FAILED_FETCH_VET_CENTERS, FETCHED_VET_CENTERS} from "./actions";


let queryVetCenters = function*(action){
	try {
		const response = yield call(fetch, `${base_url}/vaccination-centers?query=${action.payload.query}`, {
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
}



function* vetCentersSaga() {
	yield takeEvery(QUERY_VET_CENTERS, queryVetCenters);
}

export default vetCentersSaga;