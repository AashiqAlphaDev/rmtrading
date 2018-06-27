import {call, put, takeEvery} from 'redux-saga/effects';
import {
	GENERATE_TOKENS_FAILED,
	GENERATE_TOKENS_SUCCEEDED,
	REQUEST_GENERATE_TOKENS,
	REQUEST_UPDATE_TOKEN, UPDATE_TOKEN_FAILED, UPDATE_TOKEN_SUCCEEDED
} from "./actions";
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
			yield put({type: GENERATE_TOKENS_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: GENERATE_TOKENS_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: GENERATE_TOKENS_FAILED, payload: error});
	}
};

let updateToken = function*(action) {
	try {
		const response = yield call(fetch, `${base_url}/tokens/${action.payload.token_id}`, {
			credentials: 'include',
			method:'PUT',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload.data)
		});
		if (response.ok) {
			yield put({type: UPDATE_TOKEN_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: UPDATE_TOKEN_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: UPDATE_TOKEN_FAILED, payload: error});
	}
}

function* tokensSaga() {
	yield takeEvery(REQUEST_GENERATE_TOKENS, generateTokens);
	yield takeEvery(REQUEST_UPDATE_TOKEN, updateToken);
}

export default tokensSaga;