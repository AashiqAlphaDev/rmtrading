import {call, put, takeEvery} from 'redux-saga/effects';
import {
	REQUEST_ADD_REQUEST,
	ADD_REQUEST_SUCCEEDED,
	ADD_REQUEST_FAILED
} from "./actions";
import base_url from "../../base_url";


let addRequests = function* (action) {
	try {
		const response = yield call(fetch, `${base_url}/requests`, {
			method: "POST",
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(action.payload)
		});
		if (response.ok) {
			yield put({type: ADD_REQUEST_SUCCEEDED, payload: yield response.json()});
		}
		else {
			yield put({type: ADD_REQUEST_FAILED, payload: yield response.json()});
		}
	} catch (error) {
		yield put({type: ADD_REQUEST_FAILED, payload: error});
	}
};


function* requestSaga() {
	yield takeEvery(REQUEST_ADD_REQUEST, addRequests);

}

export default requestSaga;