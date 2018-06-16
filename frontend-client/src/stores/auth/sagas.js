import { call, put, takeEvery} from 'redux-saga/effects'
import {LOGIN_FAILED, LOGIN_SUCCEDED, REQUEST_LOGIN, REQUEST_SIGNUP,SIGNUP_FAILED,SIGNUP_SUCCEDED} from "./actions";

function* loginUser(action) {
	try {
		const response = yield call(fetch, "/api/login", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: LOGIN_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: LOGIN_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		console.log(error);
		yield put({type: LOGIN_FAILED, payload:error});
	}
}

function* signupUser(action) {
	try {
		const response = yield call(fetch, "/api/register", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(action.payload)
		});
		if(response.ok){
			yield put({type: SIGNUP_SUCCEDED, payload:yield response.json()});
		}
		else {
			yield put({type: SIGNUP_FAILED, payload:yield response.json()});
		}
	} catch (error) {
		console.log(error)
		yield put({type: SIGNUP_FAILED, payload:error});
	}
}


function* authSaga() {
	yield takeEvery(REQUEST_LOGIN, loginUser);
	yield takeEvery(REQUEST_SIGNUP, signupUser);
}

export default authSaga;
