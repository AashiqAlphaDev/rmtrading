import {call, put, takeEvery} from 'redux-saga/effects'
import {
	REQUEST_CREATE_USER,
	CREATE_USER_SUCCEDED,
	CREATE_USER_FAILED
} from "./actions";
import base_url from "../base_url";

let createUser = function* (action) {
	try {

		let body = action.payload;
		const response = yield call(fetch, `${base_url}/users`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
		if (response.ok) {
			yield put({type: CREATE_USER_SUCCEDED, payload: yield response.json()});
		}
		else {
			yield put({type: CREATE_USER_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: CREATE_USER_FAILED, payload: error});
	}
}


function* userSaga() {
	yield takeEvery(REQUEST_CREATE_USER, createUser)

}

export default userSaga;
