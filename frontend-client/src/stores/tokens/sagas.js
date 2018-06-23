import {call, put, takeEvery} from 'redux-saga/effects';
import {GENERATE_TOKENS_FAILED, GENERATE_TOKENS_SUCCEDED, REQUEST_GENERATE_TOKENS} from "./actions";
import base_url from "../base_url";

let generateTokens = function*(action) {
	try {
		const response = yield call(fetch, `${base_url}/tokens/generate`, {
			credentials: 'include',
			method:'POST',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: GENERATE_TOKENS_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: GENERATE_TOKENS_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: GENERATE_TOKENS_FAILED, payload: error});
	}
}

function* tokensSaga() {
	yield takeEvery(REQUEST_GENERATE_TOKENS, generateTokens);
}

export default tokensSaga;